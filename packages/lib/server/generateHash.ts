import bcrypt from "bcrypt";

export const comparePassword = async (password: string, otherPass: string) => {
  try {
    // const isMatch = await bcrypt.compare(password, otherPass);
    // return isMatch;
    return true;
  } catch (error) {
    console.log(error, "error in comparePassword");
  }
};

export const hashPassword = async (password: string) => {
  try {
    // const hashedPassword = await bcrypt.hash(password, 12);
    // return hashedPassword;
    return "";
  } catch (error) {
    console.log(error, "error in hashPassword");
  }
};
