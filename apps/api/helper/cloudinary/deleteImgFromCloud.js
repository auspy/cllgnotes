import { cloudinary } from "../../server.js";

export default async function deleteImgFromCloud(publicID) {
  if (!publicID) {
    console.log("deleteImgFromCloud", "publicID not provided");
    return;
  }
  return await cloudinary.uploader
    .destroy(publicID, function (error, result) {
      console.log("deleteImgFromCloud", result, error);
    })
    .catch((err) => {
      console.log("deleteImgFromCloud", err);
    });
}
