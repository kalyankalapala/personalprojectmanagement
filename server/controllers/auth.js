const mongoose = require("mongoose");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const createError = require("../error");
const jwt = require("jsonwebtoken");
const signup = async (req, res, next) => {
  try {
    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    res.status(200).send("user has been created");
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    // hash password
    const user = await User.findOne({
      name: { $regex: req.body.name, $options: "i" },
    });
    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) return next(createError(400, "Wrong credentials!"));

    const token = jwt.sign({ id: user._id }, process.env.JWT);
    const { password, ...others } = user._doc;

    res
      .cookie("access_token", token, {
        withCredentials: true,
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (error) {
    next(error);
  }
};
module.exports = { signup, signin };
