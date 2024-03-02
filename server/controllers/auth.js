const User = require("../models/user");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const bcrypt = require("bcryptjs");
const { throwError } = require("../utils/throwError");

exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      throwError("name, email and password are required", 400);
    }

    const user = await User.findOne({ email });

    if (user) throwError("User already exist", 409);

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: passwordHash,
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
  try {
    if (!email || !password) {
      throwError("email and password are required", 400);
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      throwError("User not found.", 404);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid password")
      throwError("Invalid password", 400);
    }
    // console.log("env",process.env)
    const token = jwt.sign({ user, id: user._id }, process.env.JWT_SECRET);

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
        <p><a>/resetpassword/${token}</a></p>
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

exports.updatePassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    if (token || !password) throwError("token and password are required", 400);

    if (token) {
      jwt.verify(
        token,
        process.env.RESET_PASSWORD_KEY,
        async (err, decoded_message) => {
          if (err) {
            throwError("Incorrect token or it is expired", 400);
          }
          const user = await User.findOne({ resetlink: token });
          if (!user) {
            throwError("User with this token does not exist", 404);
          }

          user.password = password;
          await user.save();
          return res
            .status(200)
            .json({ success: true, message: "Your password has been changed" });
        }
      );
    }
  } catch (error) {
    if (error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
