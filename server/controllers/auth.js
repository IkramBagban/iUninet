const User = require("../models/user");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");



const { hashPassword, comparePassword } = require("../utils/passwordUtils")
const { throwError } = require("../utils/throwError");

const { signJWT, verifyJWT } = require("../utils/jwtUtils")
exports.register = async (req, res, next) => {
  const { name, email, password , profilePic} = req.body;
  console.log("Req Body => ", req.file)
  // console.log("Req file => ", req)
  console.log("profilePic => ", profilePic?profilePic:'No pic')
  try {
    if (!name || !email || !password) {
      throwError("name, email, file and password are required", 400);
    }

    const user = await User.findOne({ email });

    if (user) throwError("User already exist", 409);


    const hashedPassword = await hashPassword(password);


    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      profilePic : req.file ? req.file.path : undefined
    });

    const savedUser = await newUser.save();

    if (!savedUser)
      throwError(
        "Internal Server Error : Error in saving user to database",
        500
      );

    res.status(201).json({
      success: true,
      message: "Register successfully",
      data: savedUser,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log('in login controller backend')
  try {
    if (!email || !password) {
      throwError("email and password are required", 400);
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      throwError("User not found.", 404);
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      console.log("Invalid password")
      throwError("Invalid password", 400);
    }
    // console.log("env",process.env)
    // const token = jwt.sign({ user, id: user._id }, process.env.JWT_SECRET);
    const token = await signJWT({ user, id: user._id });
    console.log(token);
    res.status(200).json({ success: true, token, user });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.forgetPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    if (!email) {
      throwError("email is required", 400);
    }

    //finding email in db
    const user = await User.findOne({ email: email });
    if (!user) {
      throwError("User not exist", 404);
    }

    const token = jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD_KEY, {
      expiresIn: "15m",
    });

    if (!token) throwError("Unauthorized!", 401);

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.email,
        pass: process.env.password,
      },
    });
    const data = {
      to: email,
      subject: "Reset Account Password Link",
      html: `
        <h3>Please click the link below to reset your password</h3>
        <p><a href="http://localhost:3000/update-password/${token}">Reset Link</a></p>
  `,
    };

    await user.updateOne({ resetlink: token });

    transporter.sendMail(data, function (error, body) {
      if (error) {
        throwError("Internal Server Error", 500);
      }

      return res
        .status(200)
        .json({ success: true, message: "Email has been sent" });
    });
  } catch (error) {
    if (error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const token = req.params.token;
    const { password } = req.body;
    if (!token || !password) throwError("token and password are required", 400);

    if (token) {
      await verifyJWT(token);
      const user = await User.findOne({ resetlink: token });
      if (!user) {
        throwError("User with this token does not exist", 404);
      }
      //hash the password
      const hashedPassword = await hashPassword(password);
      user.password = hashedPassword;

      user.resetlink = " ";


      await user.save();
      return res
        .status(200)
        .json({ success: true, message: "Your password has been changed" });
    }

  } catch (error) {
    console.log(error);
    if (error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
