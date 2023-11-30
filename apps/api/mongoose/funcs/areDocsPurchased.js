import { User } from "../modals/modals";

export const areDocsPurchased = async (docs) => {
  if (!(docs && docs.length > 0)) return null;
  try {
    const docs = await User.find({ purchasedDocs: { $in: docs } });
    console.log(docs);
    return docs;
  } catch (error) {
    console.log(error);
    return null;
  }
};
