import { PDFDocument } from "pdf-lib";
import { createWriteStream, readFileSync, unlinkSync } from "fs";
import { cloudinary } from "../../server.js";
import { zodFileUpload } from "@cllgnotes/zod";

const saveImgToCloud = async (img, type) => {
  let pathName = "";
  if (img && type) {
    const data = await img;
    const file = zodFileUpload.parse(data && data.file);
    const fileName = new Date().getTime().toString();
    const stream = file?.createReadStream();
    pathName = `./${fileName}.pdf`;

    // Define a function to count the pages in the PDF
    const countPages = async () => {
      const pdfBuffer = readFileSync(pathName);
      const pdfDoc = await PDFDocument.load(pdfBuffer);
      return pdfDoc.getPageCount();
    };

    try {
      // Create a write stream to save the PDF content to the local file
      const writeStream = createWriteStream(pathName);
      const streamToPromise = (stream) => {
        return new Promise((resolve, reject) => {
          stream.on("finish", resolve);
          stream.on("error", reject);
        });
      };
      // Pipe the PDF stream into the write stream
      stream.pipe(writeStream);

      // Wait for the write stream to finish writing the PDF
      await streamToPromise(writeStream);
      // Count the pages in the PDF
      const pageCount = await countPages();
      // Upload the local PDF file to Cloudinary
      const cloudinaryResponse = await cloudinary.uploader.upload(pathName, {
        public_id: fileName,
        folder: type,
      });

      console.log("cloudinary response", cloudinaryResponse);

      // Remove the temporary local file
      unlinkSync(pathName);

      console.log(`Number of pages in the PDF: ${pageCount}`);
      return {
        pageCount,
        img: fileName,
        cloudinaryResponse,
      };
    } catch (error) {
      pathName && unlinkSync(pathName);
      console.error("Error handling the PDF:", error);
      throw error;
    }
  }
};
export default saveImgToCloud;
