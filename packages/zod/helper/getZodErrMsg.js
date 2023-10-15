export const getZodErrMsg = (error) => {
  if (!error) {
    return "Something went wrong";
  }
  return error.name === "ZodError" && error.issues.length > 0
    ? error.issues[0].path.filter((item) => item != "input").join(" : ") +
        " : " +
        error.issues[0].message
    : error.message;
};
