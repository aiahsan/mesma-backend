"use strict";

const status = require("statuses");
const { User } = require("../models");
const config = require("../config");
const mongoose = require("mongoose");
const jsonwebtoken = require("jsonwebtoken");
const { hash, compare } = require("bcryptjs");

const register = async (req, res) => {
  const userAlreadyRegistered = await findUser(req, res);

  if (userAlreadyRegistered) {
    return res.status(status("CONFLICT")).json({ message: "User already exists." });
  }

  const { email, password, role, username} = req.body;
  console.log(req.body)
  await User.create({
    _id: mongoose.Types.ObjectId(),
    email: email,
    password: await hash(password, 12),
    role: role,
    username: username,
  });

  return res.status(status("CREATED")).json({ message: "User created successfully." });
};

const login = async (req, res) => {
  const user = await findUserLogin(req, res);

  if (!user) {
    return res.status(status("NOT FOUND")).json({ message: "User not found." });
  }

  const { password } = req.body;
  const isPasswordValid = await compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(status("UNAUTHORIZED")).json({ message: "Wrong password." });
  }
  const token = jsonwebtoken.sign({ id: user._id }, config.privateKeys.jwtPrivateKey, {
    expiresIn: "1h",
  });

  res.cookie("mesma_authentication", token, {
    maxAge: 3600000,
    httpOnly: true,  
    signed: true,
  });

  return res.status(status("OK")).json({ message: "User logged in successfully.", token: token });
};

const gettingAllUsers = async (req, res) => {
  console.log(req);
  const {isAuthorized, id} = req ;
  if (!isAuthorized) {
    return res.status(status("UNAUTHORIZED")).json({ message: "You are not allowed to perform this action." });
  }
  const users = await User.find({}).exec();
  return res.status(status("OK")).json({message: "User retrieved successfully.", users: users});
}

const postingNewUser = async (req, res) => {
  
  const {isAuthorized, id} = req;
  
  if (!isAuthorized) {
    return res.status(status("UNAUTHORIZED")).json({ message: "You are not allowed to perform this action." });
  }
  const loginUser = await User.findById(id).exec();
  if (loginUser.role != "ADMIN") {
    return res.status(status("UNAUTHORIZED")).json({ message: "You are not an Administrator." });
  }
  
  return await register(req, res);
}

const updatingUser = async (req, res) => {
  const {isAuthorized, id} = req ;

  if (!isAuthorized) {
    return res.status(status("UNAUTHORIZED")).json({ message: "You are not allowed to perform this action." });
  }

  const {userId} = req.params ;

  const user = await User.findById(userId).exec() ;

  if (!user) {
    return res.status(status("BAD REQUEST")).json({ message: "User does not exist." });
  }

  const {email, username, descritpion} = req.body ;
  
  if (email) {
    user.email = email;
  }
  if (username) {
    user.username = username;
  }
  if (descritpion) {
    user.descritpion = descritpion;
  }

  await user.save();

  return res.status(status("OK")).json({ message: "User updated successfully."});
}

const gettingLoginUser = async (req, res) => {
  const {isAuthorized, id} = req ;
  
  if (!isAuthorized) {
    return res.status(status("UNAUTHORIZED")).json({ message: "No user is logged in." });
  }

  const user = await User.find({_id: id}).exec();

  return res.status(status("OK")).json({ message: "Logged in user retrieved successfully", user: user});
}

const loggingOut = async (req, res) => {
  const {isAuthorized, id} = req ;
  if (!isAuthorized) {
    return res.status(status("UNAUTHORIZED")).json({ message: "No user is logged in." });
  }
  return res.status(status("OK")).json({ message: "User logged out successfully."});
}

const removingUser = async (req, res) => {
  const {isAuthorized, id} = req ;

  if (!isAuthorized) {
    return res.status(status("UNAUTHORIZED")).json({ message: "You are not allowed to perform this action." });
  }
  const loginUser = await User.findById(id).exec();
  if (loginUser.role != "ADMIN") {
    return res.status(status("UNAUTHORIZED")).json({ message: "You are not allowed to perform this action." });
  }

  const {userId} = req.params ;
  const user = await User.findById(userId).exec() ;
  if (!user) {
    return res.status(status("BAD REQUEST")).json({ message: "User not exists." });
  }

  const del = await User.deleteOne(user).exec();

  return res.status(status("OK")).json({ message: "User removed successfully", status: del});
}
//Supporting Functions

const findUser = async (req, res) => {
  const { email, password, role, username} = req.body;

  if (!email) {
    return res.status(status("BAD REQUEST")).json({ message: "Email not provided" });
  }

  if (!password) {
    return res.status(status("BAD REQUEST")).json({ message: "Password not provided" });
  }
  // Role Reuired - MMMS
  if (!role) {
    return res.status(status("BAD REQUEST")).json({ message: "Role not provided" });
  }
  if (role != "ADMIN" && role != "USER") {
    return res.status(status("BAD REQUEST")).json({ message: Role `${role} not supported` });
  }
  if (!username) {
    return res.status(status("BAD REQUEST")).json({ message: "Username not provided" });
  }

  return await User.findOne({ email: email }).exec();
};

const findUserLogin = async (req, res) => {
  const { email, password} = req.body;

  if (!email) {
    return res.status(status("BAD REQUEST")).json({ message: "Email not provided" });
  }

  if (!password) {
    return res.status(status("BAD REQUEST")).json({ message: "Password not provided" });
  }
  return await User.findOne({ email: email }).exec();
};

exports.login = login;
exports.register = register;
exports.gettingAllUsers = gettingAllUsers;
exports.postingNewUser = postingNewUser;
exports.updatingUser = updatingUser;
exports.gettingLoginUser = gettingLoginUser;
exports.loggingOut = loggingOut;
exports.removingUser = removingUser;