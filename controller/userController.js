"use strict";

const status = require("statuses");
const { User } = require("../models");
const config = require("../config");
const mongoose = require("mongoose");
const jsonwebtoken = require("jsonwebtoken");
const { hash, compare } = require("bcryptjs");


const register = async (req, res) => {

    const { name,number,email,purchseAmt,points,wholeSaler,Status,registerDate,address} = req.body;

    const userAlreadyRegistered = await User.findOne({ email: email }).exec();
  
    if (userAlreadyRegistered) {
      return res.status(status("CONFLICT")).json({ message: "User already exists." });
    }
  
    console.log(req.body)
    // await User.create({
    //   _id: mongoose.Types.ObjectId(),
    //   email: email,
    //   password: await hash(password, 12),
    //   role: role,
    //   username: username,
    // });
  
    return res.status(status("CREATED")).json({ message: "User created successfully.",me:req.body });
  };

  exports.register = register;
