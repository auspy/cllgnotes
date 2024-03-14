import crypto from "crypto";
// to generate key openssl rand -hex 32
const encrypt = (text) => {
  try {
    if (!text) {
      return text;
    }

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      "aes-256-cbc",
      Buffer.from(process.env.ENCRYPT_KEY || key, "hex"),
      iv
    );

    let encrypted = cipher.update(text, "utf8", "base64");
    encrypted += cipher.final("base64");

    const combinedData = iv.toString("base64") + ":" + encrypted;

    return combinedData;
  } catch (error) {
    console.log(error, " error in encrypt");
    return text;
  }
};

const decrypt = (text) => {
  try {
    if (!text) {
      return text;
    }

    const [encodedIV, encryptedData] = text.split(":");
    const iv = Buffer.from(encodedIV, "base64");

    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(process.env.ENCRYPT_KEY || key, "hex"),
      iv
    );

    let decrypted = decipher.update(encryptedData, "base64", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch (error) {
    console.log(error, " error in decrypt");
    return "";
  }
};

export { encrypt, decrypt };
