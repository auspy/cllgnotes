import mongoose from "mongoose";
import { Admin, Docs, User } from "../../mongoose/modals/modals.js";
import saveImgToCloud from "../../helper/cloudinary/saveImgToCloud.js";
import deleteImgFromCloud from "../../helper/cloudinary/deleteImgFromCloud.js";
import redisClient, { getRedisItems } from "../../config/redis.config.js";
import addToSet from "../../helper/addToSet.js";
import getPurchasedDocs from "../../mongoose/funcs/getPurchasedDocs.js";

const resolverDocs = {
  getDocs: async (_, __, context) => {
    console.log("--- in get docs ---");
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
    let pDocs = [];
    if (user && user._id) {
      // GET PDOCS FROM CACHE
      const cachedPDocs = await redisClient.hkeys(user.id + ":purchasedDocs");
      if (cachedPDocs && cachedPDocs.length > 0) {
        console.log("--- using cached purchased docs ---");
        // SET PURCHASED DOCS
        pDocs = cachedPDocs;
      } else {
        pDocs = await getPurchasedDocs(user._id);
      }
    }

    addToSet(purchasedDocs, pDocs);
    // END: GETTING PURCHASE DOCS

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
      const { id, userId } = args;
      const { user } = context;
      console.log("--- in get course ---", id, user, userId);
      // SEARCH FOR DOC IN CACHE
      let data = null;
      data = await getRedisItems("docs", id);
      // IF NOT FOUND GET FROM DB
      if (!data) data = await Docs.findById(id).populate("creator").exec();
      if (!data) {
        console.log("--- Doc not found ---");
        return {
          msg: "Doc not found",
          status: "failed",
          data: [],
        };
      }
      // IF USER EXISTS
      if ((user && user._id) || userId) {
        const uid = (Boolean(user) && user._id) || userId;
        let isPurchased = false;
        // CHECK IF DOC IS PURCHASED IN CACHE
        console.log("--- getting purchased doc from cache ---");
        isPurchased = await redisClient.hexists(uid + ":purchasedDocs", id);
        console.log("is in cahce?", isPurchased);
        // IF NOT FOUND CHECK IF PURCHASED CACHE EXISTS
        const keyExists = await redisClient.exists(uid + ":purchasedDocs");
        // IF NOT FOUND GET FROM DB
        if (!isPurchased && !keyExists) {
          isPurchased = await getPurchasedDocs(uid);
          isPurchased = isPurchased?.includes(id);
        }
        data.isPurchased = Boolean(isPurchased);
      }
      return {
        msg: "Doc fetched successfully",
        status: "success",
        data: [data],
      };
    } catch (error) {
      console.log(`Error in getDoc: ${error.message}`);
      return {
        msg: error.message,
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
      console.log(uid, "in get purchased docs");
      if (!uid) return { msg: "Invalid user", status: "failed" };
      // CHECK IF PURCHASED DOCS INFO EXISTS IN CACHE
      const pDocs = [];
      let infoExists = await redisClient.hget(uid + ":purchasedDocs", "info");
      // IF EXISTS IN CACHE
      if (infoExists) {
        console.log("--- using cached purchased docs info ---");
        // GET PDOCS FROM CACHE
        const cachedPDocs = await redisClient.hvals(uid + ":purchasedDocs");
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
        const docs = await User.findById(uid)
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
        redisClient.hset(uid + ":purchasedDocs", { info: true, ...a });
        console.log("-- added purchased docs info in cache --");
      }
      console.log("-- get purchased docs", pDocs.length);
      if (pDocs.length === 0) {
        return {
          msg: "No purchased docs found",
          status: "success",
        };
      }
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
      console.log("validating user");
      if (!(user && user._id)) return { msg: "Invalid user", status: "failed" };
      console.log("user validated");
      // CHECK IF CREATED COURSES EXISTS IN CACHE
      let cDocs = await redisClient.hkeys(user._id + ":createdDocs");
      if (cDocs.length == 0) {
        // IF NOT FOUND GET FROM DB
        const courses = await Admin.findById(user._id)
          .select("createdDocs")
          .populate({
            path: "createdDocs",
            populate: {
              path: "creator",
            },
          })
          .limit(50) // just a most easy but bad way to prevent many course get fetched
          .exec();
        cDocs = courses.createdDocs;
        // STORE NEW DOCS IN CACHE
        redisClient.hset(
          user._id + ":createdDocs",
          cDocs.reduce((prev, curr) => ({ ...prev, [curr]: true }), {})
        );
        redisClient.expire(user._id + ":createdDocs", 60 * 60 * 24 * 7); // expires in a week
      }
      // console.log("get created courses", courses.createdDocs);
      return {
        msg: "Docs fetched successfully",
        status: "success",
        data: cDocs || [],
      };
    } catch (error) {
      console.log(`Error in getCreatedDocs: ${error.message}`);
      return {
        msg: error.message,
        status: "failed",
        err: JSON.stringify(error),
      };
    }
  },
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
      if (!(user && user._id)) return { msg: "Invalid user", status: "failed" };
      console.log("user validated");
      // DATA RECEIVED
      const { input } = args;
      console.log("data received", input);
      if (!input.createdAt) input.createdAt = new Date();
      if (!input.creator) input.creator = user._id;
      // console.log("in add course", input, input.img);
      // managing image upload
      const uploadedImg = await saveImgToCloud(input.img, input.type);
      if (!uploadedImg) return { msg: "Image upload failed", status: "failed" };
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
      const updateCreatedDocs = await Admin.updateOne(
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
        return {
          msg: "failed to add course to admim, admin not found",
          status: "failed",
          data: [updateCreatedDocs],
        };
      }
      // SAVE COURSE
      const doc = await newDoc.save();
      // console.log(doc);
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
      if (!(user && user._id)) return { msg: "Invalid user", status: "failed" };
      // DATA RECEIVED
      const input = args.input;
      const id = args.id;
      // console.log("data received", input, id, user);
      if (!id) return { msg: "Invalid id", status: "failed" };
      // UPDATING DATA
      // console.log(
      //   "updating course",
      //   id,
      //   user._id,
      //   input,
      //   new mongoose.Types.ObjectId(user._id)
      // );
      const updateData = await Docs.updateOne(
        { _id: id, creator: user._id }, // using creator to make sure that only the creator can update the course
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
    try {
      const { user } = context;
      if (!(user && user._id))
        return {
          msg: "Login with user account to purchase!",
          status: "failed",
        };
      const { docId, amount, payMethod } = args;
      // check if course exists
      const course = await Docs.findById(docId);
      // match price with amount
      if (course.price !== amount)
        return { msg: "Invalid amount", status: "failed" };
      // Add to purchased courses
      const updatePurchasedDocs = await User.updateOne(
        { _id: user._id },
        { $addToSet: { purchasedDocs: docId } }
      );
      if (
        updatePurchasedDocs.acknowledged == true &&
        updatePurchasedDocs.matchedCount == 1 &&
        updatePurchasedDocs.modifiedCount == 0
      ) {
        console.log("Doc already purchased!");
        return {
          msg: "Doc already purchased!",
          status: "failed",
          data: [updatePurchasedDocs],
        };
      }
      if (
        updatePurchasedDocs.acknowledged === false ||
        updatePurchasedDocs.modifiedCount === 0 ||
        updatePurchasedDocs.matchedCount === 0
      ) {
        console.log("failed to update purchased courses");
        // not updated
        return {
          msg: "Transaction failed, please try again later!",
          status: "failed",
          data: [updatePurchasedDocs],
        };
      }
      // UPDATE CACHE IF EXISTS
      const keyExists = await redisClient.exists(user._id + ":purchasedDocs");
      if (keyExists) {
        // CHECK IF INFO IS ADDED FOR OTHER DOCS
        const isInfo = await redisClient.hexists(
          user._id + ":purchasedDocs",
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
        await redisClient.hset(user._id + ":purchasedDocs", docId, data);
        console.log("--- updated purchased courses cache ---");
      }
      return {
        msg: "Doc purchased successfully 👍!",
        status: "success",
        data: [updatePurchasedDocs],
      };
    } catch (error) {
      console.log(`Error in purchaseDoc: ${error.message}`);
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
  //     if (!(user && user._id)) return { msg: "Invalid user", status: "failed" };
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
