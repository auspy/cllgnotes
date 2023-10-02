import { Admin, User } from "../../mongoose/modals/modals.js";
import { encryptAccessToken } from "../../helper/jwtToken.js";
import { cookieOptions } from "../../constants.js";

const resolverAuth = {
  login: async (parent, args, context) => {
    console.log("-- Entered login resolver --");
    let type = User;
    const { username, password, role } = args;
    if (role === "ADMIN") {
      type = Admin;
    }
    const user = await type.findOne({ username: username.toLowerCase() });
    if (!user) {
      return {
        msg: "Invalid user, user not found",
        status: "failed",
      };
    }
    // console.log(user, "in login");
    const token = encryptAccessToken({ username, _id: user._id, role });
    if (!token) {
      return {
        msg: "Token was not created",
        status: "failed",
      };
    }

    if (password !== user.password) {
      return {
        msg: "Invalid user, wrong password",
        status: "failed",
      };
    }
    // add token to authorization header
    try {
      context.res.cookie("next-auth.session-token", token, cookieOptions);
      // console.log("Login success", cookieOptions);
      return {
        msg: "login success",
        token,
        status: "success",
        data: user,
      };
    } catch (error) {
      console.log("Error setting cookie", error);
      context.res.status(500).send("Error setting cookie");
      return {
        msg: "login failed",
        token,
        error,
        status: "failed",
        data: user,
      };
    }
  },
  register: async (parent, args) => {
    let type = User;
    const { user } = args;
    const { role, username } = user;
    if (role === "ADMIN") {
      type = Admin;
    }
    const doc = await type.findOne({ username: username.toLowerCase() });
    if (doc) {
      return {
        msg: "Invalid user, user already exists",
        status: "failed",
      };
    }
    const newUser = new type({ username: username.toLowerCase(), ...user });
    const savedUser = await newUser.save();
    if (!savedUser) {
      return {
        msg: "User not saved",
        status: "failed",
      };
    }
    return {
      msg: "User created successfully",
      status: "success",
      data: savedUser,
    };
  },
  logout: async (parent, args, context) => {
    console.log("Entered logout resolver");
    context.res.cookie("authToken", "", {
      httpOnly: true,
      maxAge: 0,
    });
    return {
      msg: "Logout success",
      status: "success",
    };
  },
};

export default resolverAuth;
