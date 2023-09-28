import mongoose from "mongoose";
import { Admin, Docs, User } from "../../mongoose/modals/modals.js";
import saveImgToCloud from "../../helper/cloudinary/saveImgToCloud.js";
import deleteImgFromCloud from "../../helper/cloudinary/deleteImgFromCloud.js";

const resolverDocs = {
  getDocs: async () => {
    const docs = await Docs.find({ published: true })
      .populate("creator")
      .limit(100) // just a most easy but bad way to prevent many course get fetched
      .exec();
    return {
      msg: "Docs fetched successfully",
      status: "success",
      data: docs,
    };
  },
  getDoc: async (_, args) => {
    try {
      const { id } = args;
      console.log("in get course", id);
      const data = await Docs.findById(id).populate("creator").exec();
      if (!data) {
        return {
          msg: "Doc not found",
          status: "failed",
          data: [],
        };
      }
      // console.log("getDoc", data);
      return {
        msg: "Docs fetched successfully",
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
  getPurchasedDocs: async (_, __, context) => {
    try {
      const { user } = context;
      console.log(user, "in get purchased courses");
      if (!(user && user._id)) return { msg: "Invalid user", status: "failed" };
      // console.log("getting purchased courses for user", user._id);
      const courses = await User.findById(user._id)
        .populate({
          path: "purchasedDocs",
          populate: {
            path: "creator",
          },
        })
        .limit(50) // just a most easy but bad way to prevent many course get fetched
        .exec();
      return {
        msg: "Docs fetched successfully",
        status: "success",
        data: courses.purchasedDocs,
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
      // console.log("getting courses for user", user._id);
      const courses = await Admin.findById(user._id)
        .populate({
          path: "createdDocs",
          populate: {
            path: "creator",
          },
        })
        .limit(50) // just a most easy but bad way to prevent many course get fetched
        .exec();
      // console.log("get created courses", courses.createdDocs);
      return {
        msg: "Docs fetched successfully",
        status: "success",
        data: courses.createdDocs || [],
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
