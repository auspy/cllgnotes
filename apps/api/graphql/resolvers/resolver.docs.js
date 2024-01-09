import mongoose from "mongoose";
import { z } from "zod";
import mongoConn from "../../config/mongoose.config.js";
import { Docs, User } from "../../mongoose/modals/modals.js";
import saveImgToCloud from "../../helper/cloudinary/saveImgToCloud.js";
import deleteImgFromCloud from "../../helper/cloudinary/deleteImgFromCloud.js";
import redisClient, { getRedisItems } from "../../config/redis.config.js";
import addToSet from "../../helper/addToSet.js";
import {
  getZodErrMsg,
  zodCreateDoc,
  zodMonogId,
  zodPurchaseDoc,
  zodUpdateDoc,
} from "@cllgnotes/zod";
import { getFilterDocs, getPurchasedDocs } from "../../mongoose/funcs/index.js";
const resolverDocs = {
  getDocs: async (parent, __, context) => {
    console.log("--- in get docs ---", parent);
    const cachedDocs = await redisClient.hgetall("docs");
    const docs =
      Object.values(cachedDocs).map((item) => JSON.parse(item)) || [];
    const purchasedDocs = new Set();
    if (!docs || docs.length === 0) {
      // IF NOT IN CACHE, GET FROM DB
      console.log("--- getting new docs ---");
      const newDocs = await Docs.find({ published: true })
        .populate("creator")
        .limit(100) // just a most easy but bad way to prevent many course get fetched
        .exec();
      // SET DOCS
      Array.prototype.push.apply(docs, newDocs);
      // STORE NEW DOCS IN CACHE
      const a = newDocs.reduce(
        (acc, doc) => ({
          ...acc,
          [doc._id]: JSON.stringify(doc),
        }),
        {}
      );
      redisClient.hset("docs", a);
      redisClient.expire("docs", 60 * 60 * 24 * 7); // expires in a week
    }
    // START: GETTING PURCHASE DOCS
    const { user } = context;
    const validUID = zodMonogId.safeParse(user?._id).data;
    console.log("user in gerDocs", validUID, user);
    let pDocs = [];
    if (validUID) {
      // GET PDOCS FROM CACHE
      const cachedPDocs = await redisClient.hkeys(validUID + ":purchasedDocs");
      if (cachedPDocs && cachedPDocs.length > 0) {
        console.log("--- using cached purchased docs ---");
        // SET PURCHASED DOCS
        pDocs = cachedPDocs;
      } else {
        console.log("--- getting purchased docs from db ---");
        pDocs = await getPurchasedDocs(validUID);
      }
    }

    addToSet(purchasedDocs, pDocs);
    // END: GETTING PURCHASE DOCS
    console.log("--- docs fetched successfully ---");
    return {
      msg: "Docs fetched successfully",
      status: "success",
      data: docs.map((doc) => {
        if (purchasedDocs.has(doc._id.toString())) {
          doc.isPurchased = true;
        } else {
          doc.isPurchased = false;
        }
        return doc;
      }),
    };
  },
  getDoc: async (_, args, context) => {
    try {
      // INPUTS
      const { id, userId } = args;
      const { user } = context;
      const uid = (Boolean(user) && user._id) || userId;
      // ZOD CHECK FOR INPUTS
      const validDocId = zodMonogId.parse(id, {
        errorMap: (error) => {
          return {
            message: "This document does not exist.",
            path: error.path,
          };
        },
      });
      const validUserId = zodMonogId.safeParse(uid).data;
      console.log(
        user,
        "--- in get course ---",
        validDocId,
        "is user valid ->",
        validUserId
      );
      // SEARCH FOR DOC IN CACHE
      let data = null;
      console.log("--- getting doc from cache ---");
      data = await getRedisItems("docs", validDocId);
      console.log("is in cache?", Boolean(data));
      // IF NOT FOUND GET FROM DB
      if (!data)
        data = await Docs.findById(validDocId).populate("creator").exec();
      if (!data) {
        console.log("--- Doc not found ---");
        throw new Error("Doc not found");
      }
      // IF USER EXISTS
      if (validUserId) {
        let isPurchased = false;
        // CHECK IF DOC IS PURCHASED IN CACHE
        console.log("--- getting purchased doc from cache ---");
        isPurchased = await redisClient.hexists(
          uid + ":purchasedDocs",
          validDocId
        );
        console.log("is in cahce?", isPurchased);
        // IF NOT FOUND CHECK IF PURCHASED CACHE EXISTS
        const keyExists = await redisClient.exists(uid + ":purchasedDocs");
        // IF NOT FOUND GET FROM DB
        if (!isPurchased && !keyExists) {
          isPurchased = await getPurchasedDocs(uid);
          isPurchased = isPurchased?.includes(validDocId);
        }
        data.isPurchased = Boolean(isPurchased);
      }
      console.log("--- doc fetched successfully ---");
      return {
        msg: "Doc fetched successfully",
        status: "success",
        data: [data],
      };
    } catch (error) {
      console.log(`Error in getDoc: ${error.message}`, error.name);
      return {
        msg: getZodErrMsg(error),
        status: "failed",
        err: JSON.stringify(error),
      };
    }
  },
  getPurchasedDocs: async (_, args, context) => {
    try {
      const { userId } = args;
      const { user } = context;
      const uid = (Boolean(user) && user._id) || userId;
      const validUID = zodMonogId.safeParse(uid).data;
      console.log(validUID, "in get purchased docs");
      if (!validUID)
        return {
          msg: "Login to continue. If already logged in, please relogin.",
          status: "failed",
        };
      // CHECK IF PURCHASED DOCS INFO EXISTS IN CACHE
      const pDocs = [];
      let infoExists = await redisClient.hget(
        validUID + ":purchasedDocs",
        "info"
      );
      // IF EXISTS IN CACHE
      if (infoExists) {
        console.log("--- using cached purchased docs info ---");
        // GET PDOCS FROM CACHE
        const cachedPDocs = await redisClient.hvals(
          validUID + ":purchasedDocs"
        );
        // SET PURCHASED DOCS
        for (const doc of cachedPDocs) {
          try {
            if (doc === "true") continue;
            pDocs.push(JSON.parse(doc));
          } catch (error) {
            console.log(error, "in getPurchasedDocs");
            infoExists = false;
          }
        }
      }
      // IF NOT FOUND IN CACHE, GET FROM DB (PUTTING IN IF STATEMENT TO CALL DB IF ERROR OCCURS IN CACHE)
      if (!infoExists) {
        // console.log("getting purchased courses for user", uid);
        const docs = await User.findById(validUID)
          .select("purchasedDocs")
          .populate({
            path: "purchasedDocs",
            populate: {
              path: "creator",
            },
          })
          .limit(50) // just a most easy but bad way to prevent many course get fetched
          .exec();
        console.log(docs.length, "found in purchased docs --");
        Array.prototype.push.apply(pDocs, docs.purchasedDocs);
        // STORE NEW DOCS IN CACHE
        const a = docs.purchasedDocs.reduce(
          (acc, doc) => ({
            ...acc,
            [doc._id]: JSON.stringify(doc),
          }),
          {}
        );
        redisClient.hset(validUID + ":purchasedDocs", { info: true, ...a });
        console.log("-- added purchased docs info in cache --");
      }
      console.log("-- get purchased docs", pDocs.length);
      if (pDocs.length === 0) {
        console.log("--- purchased docs not found ---");
        return {
          msg: "No purchased docs found",
          status: "success",
        };
      }
      console.log("--- purchased docs fetched successfully ---");
      return {
        msg: "Docs fetched successfully",
        status: "success",
        data: pDocs,
      };
    } catch (error) {
      console.log(`Error in getPurchasedDocs: ${error.message}`);
      return {
        msg: error.message,
        status: "failed",
        err: JSON.stringify(error),
      };
    }
  },
  getCreatedDocs: async (_, __, context) => {
    try {
      console.log("in get created courses");
      const { user } = context;
      console.log("validating user", user);
      const validUID = zodMonogId.safeParse(user?._id).data;
      if (!validUID) {
        console.log("user not validated");
        return {
          msg: "Login to continue. If already logged in, please relogin.",
          status: "failed",
        };
      }
      console.log("user validated");
      // CHECK IF CREATED COURSES EXISTS IN CACHE
      console.log("getting data from cache");
      let cDocs = await redisClient.hvals(validUID + ":createdDocs");
      if (cDocs.length == 0 || !cDocs || Object.keys(cDocs).length == 0) {
        // IF NOT FOUND GET FROM DB
        console.log("getting created docs for user", validUID);
        const docs = await User.findById(validUID)
          .select("createdDocs")
          .populate({
            path: "createdDocs",
            populate: {
              path: "creator",
            },
          })
          .exec();

        console.log("got docs from db, adding to cache", docs);
        cDocs = docs.createdDocs;
        // STORE NEW DOCS IN CACHE
        redisClient.hset(
          validUID + ":createdDocs",
          cDocs.reduce(
            (prev, curr) => ({ ...prev, [curr._id]: JSON.stringify(curr) }),
            {}
          )
        );
        redisClient.expire(validUID + ":createdDocs", 60 * 60 * 24 * 7); // expires in a week
      } else {
        console.log("parsing data from cache");
        cDocs = cDocs.map((item) => JSON.parse(item));
      }
      console.log("--- created docs fetched successfully ---");
      return {
        msg: "Docs fetched successfully",
        status: "success",
        data: cDocs || [],
      };
    } catch (error) {
      console.log(`--- Error in getCreatedDocs: ${error.message}`);
      return {
        msg: error.message,
        status: "failed",
        err: JSON.stringify(error),
      };
    }
  },
  getFilteredDocs: getFilterDocs,
};

const resolverMutDocs = {
  // todo for now the image is just being added. we need to verify that the uploaded image is correct. so need to add some fature which dont show the image to user until admin verifies it
  addDoc: async (_, args, context) => {
    let publicID;
    try {
      const { user } = context;
      console.log("--- in add course ---");
      // console.log("in add cousrse", args,args.input.img);
      console.log("validating user");
      const validUID = zodMonogId.safeParse(user?._id).data;
      if (!validUID)
        return {
          msg: "Login to continue. If already logged in, please relogin.",
          status: "failed",
        };
      console.log("user validated");
      // DATA RECEIVED
      console.log("data received", args.input);
      const validArgs = zodCreateDoc.parse(args);
      const { input } = validArgs;
      if (!input.createdAt) input.createdAt = new Date();
      if (!input.creator) input.creator = validUID;
      if (!input.price) input.price = 0;
      // console.log("in add course", input, input.img);
      // managing image upload
      const uploadedImg = await saveImgToCloud(args.input.img, input.type);
      if (!uploadedImg) {
        console.log("-- image upload failed --");
        return { msg: "Image upload failed", status: "failed" };
      }
      const { pageCount, img: fileName, cloudinaryResponse } = uploadedImg;
      // Update input.pageCount and input.img
      input.pageCount = pageCount;
      input.img = fileName; // Store the Cloudinary URL
      publicID = cloudinaryResponse.public_id;
      input.creator = new mongoose.Types.ObjectId(input.creator);
      input.purchaseCount = 0;
      input.tLikes = 0;
      // ADD COURSE TO ADMIN
      const newDoc = new Docs(input);
      const updateCreatedDocs = await User.updateOne(
        { _id: input.creator },
        { $push: { createdDocs: newDoc._id } }
      );
      console.log(updateCreatedDocs, input.creator, newDoc._id);
      if (
        updateCreatedDocs.acknowledged === false ||
        updateCreatedDocs.modifiedCount === 0 ||
        updateCreatedDocs.matchedCount === 0
      ) {
        // not updated, delete img from cloud if saved
        deleteImgFromCloud(publicID);
        console.log("-- failed to add course to admin --");
        return {
          msg: "failed to add course to admim, admin not found",
          status: "failed",
          data: [updateCreatedDocs],
        };
      }
      // SAVE DOC TO DB
      const doc = await newDoc.save();
      // console.log(doc);
      // ADD DOC TO CACHE
      const jsonDoc = JSON.stringify(doc);
      const keyExists = await redisClient.exists(validUID + ":createdDocs");
      if (keyExists) {
        console.log("adding to cache");
        redisClient
          .hset(validUID + ":createdDocs", doc._id, jsonDoc)
          .then(() => {
            console.log(
              "new doc added to createdDocs cache for user ",
              validUID
            );
          });
      }
      console.log("-- doc added successfully --");
      return {
        msg: "Doc added successfully",
        status: "success",
        data: [doc],
      };
    } catch (error) {
      console.log(`Error in addDoc: ${error.message}`);
      deleteImgFromCloud(publicID);
      return {
        msg: error.message,
        status: "failed",
        err: error,
      };
    }
  },
  updateDoc: async (_, args, context) => {
    try {
      // CHECKING USER
      const { user } = context;
      console.log("in update course");
      const validUID = zodMonogId.safeParse(user?._id).data;
      if (!validUID)
        return {
          msg: "Login to continue. If already logged in, please relogin.",
          status: "failed",
        };
      // DATA RECEIVED
      const validArgs = zodUpdateDoc.parse(args);
      const { input, id } = validArgs;
      // console.log("data received", input, id, user);
      if (!id) return { msg: "Invalid id", status: "failed" };
      // UPDATING DATA
      // console.log(
      //   "updating course",
      //   id,
      //   validUID,
      //   input,
      //   new mongoose.Types.ObjectId(validUID)
      // );
      const updateData = await Docs.updateOne(
        { _id: id, creator: validUID }, // using creator to make sure that only the creator can update the course
        { $set: input }
      );
      console.log("doc found to update", updateData);
      // CHECKING IF UPDATED
      if (updateData.matchedCount === 0)
        // not updated
        return {
          msg: "Doc not found",
          status: "failed",
          data: [updateData],
        };
      if (updateData.acknowledged === false || updateData.modifiedCount === 0) {
        return {
          msg: "Doc not updated",
          status: "failed",
          data: [updateData],
        };
      }
      // UPDATE CACHE IF EXISTS
      const keyExists = await redisClient.hexists(
        validUID + ":createdDocs",
        id
      );
      if (keyExists) {
        console.log("updating created docs cache");
        const oldData = await getRedisItems(validUID + ":createdDocs", id);
        redisClient
          .hset(
            validUID + ":createdDocs",
            id,
            JSON.stringify({
              ...oldData,
              ...input,
            })
          )
          .then(() => {
            console.log("doc updated in createdDocs cache for user ", validUID);
          });
      }
      // RETURNING UPDATED DATA ON SUCCESS
      return {
        msg: "Doc updated successfully",
        status: "success",
        data: [updateData],
      };
    } catch (error) {
      console.log(`Error in updateDoc: ${error.message}`);
      return {
        msg: error.message,
        status: "failed",
        err: JSON.stringify(error),
      };
    }
  },
  purchaseDoc: async (_, args, context) => {
    // const session = await mongoConn.startSession();
    // await session.startTransaction();
    try {
      const { user } = context;
      const validUID = zodMonogId.safeParse(user?._id).data;
      if (!validUID) throw new Error("Invalid user, please login to purchase!");
      const validArgs = zodPurchaseDoc.parse(args);
      console.log("args in ", validArgs, "in purchase course");
      const { docId, amount, payMethod } = validArgs;
      // check if course exists
      const course = await Docs.findById(docId);
      // match price with amount
      if (course.price !== amount)
        throw new Error("Price mismatch, please try again later!");
      // Add to purchased courses
      const updatePurchasedDocs = await User.updateOne(
        { _id: validUID },
        { $addToSet: { purchasedDocs: docId } }
      );
      // .session(session);
      if (
        updatePurchasedDocs.acknowledged == true &&
        updatePurchasedDocs.matchedCount == 1 &&
        updatePurchasedDocs.modifiedCount == 0
      ) {
        console.log("Doc already purchased!");
        throw new Error("Doc already purchased!");
      }
      if (
        updatePurchasedDocs.acknowledged === false ||
        updatePurchasedDocs.modifiedCount === 0 ||
        updatePurchasedDocs.matchedCount === 0
      ) {
        console.log("failed to update purchased courses");
        // not updated
        throw new Error("Transaction failed, please try again later!");
      }

      // UPDATE PURCHASE COUNT
      const updatePurchaseCount = await Docs.updateOne(
        { _id: docId },
        {
          $inc: { purchaseCount: 1 },
        }
      );
      // .session(session);
      if (
        updatePurchaseCount.acknowledged === false ||
        updatePurchaseCount.modifiedCount === 0 ||
        updatePurchaseCount.matchedCount === 0
      ) {
        console.log("failed to update purchase count");
        // not updated
        throw new Error("Transaction failed, please try again later!");
      }

      // UPDATE CACHE IF EXISTS
      const keyExists = await redisClient.exists(validUID + ":purchasedDocs");
      if (keyExists) {
        // CHECK IF INFO IS ADDED FOR OTHER DOCS
        const isInfo = await redisClient.hexists(
          validUID + ":purchasedDocs",
          "info"
        );
        let data = true;
        // IF INFO EXISTS, GET DATA FROM DB
        if (isInfo) {
          console.log(
            "--- getting data for purchased course for cache info ---"
          );
          // STORE DATA IN CACHE
          data = await Docs.findById(docId).populate("creator").exec();
        }
        console.log("--- updating purchased courses cache ---");
        await redisClient.hset(validUID + ":purchasedDocs", docId, {
          ...data,
          purchaseCount: data.purchaseCount + 1,
        });
        console.log("--- updated purchased courses cache ---");
      }

      // await session.commitTransaction();
      // session.endSession();
      return {
        msg: "Doc purchased successfully 👍!",
        status: "success",
        data: [updatePurchasedDocs],
      };
    } catch (error) {
      console.log(`Error in purchaseDoc: ${error.message}`);
      // await session.abortTransaction();
      // session.endSession();
      return {
        msg: error.message,
        status: "failed",
        err: JSON.stringify(error),
      };
    }
  },
  // deleteDoc: async (_, args, context) => {
  //   try {
  //     // CHECKING USER
  //     const { user } = context;
  //     console.log(user);
  //     if (!(user && user._id)) return { msg: "Login to continue. If already logged in, please relogin.", status: "failed" };
  //     // DATA RECEIVED
  //     const id = args.id;
  //     // console.log("data received", id, user);
  //     if (!id) return { msg: "Invalid id", status: "failed" };
  //     // DELETING DATA
  //     const deleteData = await Doc.deleteOne({
  //       _id: id,
  //       creator: user._id, // using creator to make sure that only the creator can delete the course
  //     });
  //     // console.log("doc found to delete", deleteData);
  //     // CHECKING IF DELETED
  //     if (
  //       deleteData.acknowledged === false ||
  //       deleteData.deletedCount === 0 ||
  //       deleteData.matchedCount === 0
  //     )
  //       // not deleted
  //       return {
  //         msg: "failed to delete course",
  //         status: "failed",
  //         data: [deleteData],
  //       };
  //     // RETURNING DELETED DATA ON SUCCESS
  //     return {
  //       msg: "Doc deleted successfully",
  //       status: "success",
  //       data: [deleteData],
  //     };
  //   } catch (error) {
  //     console.log(`Error in deleteDoc: ${error.message}`);
  //     return {
  //       msg: error.message,
  //       status: "failed",
  //       err: JSON.stringify(error),
  //     };
  //   }
  // },
};

export { resolverDocs, resolverMutDocs };
