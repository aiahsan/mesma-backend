"use strict";

const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");

dotenvExpand(dotenv.config());

const {
  PORT,
  DATABASE_URI,
  JWT_TOKEN,
  COOKIE_TOKEN,
} = process.env;

const serverConfig = {
  port: PORT,
};

const databaseConfig = {
  uri: "mongodb+srv://ahsan199715:P2vocW8rhp579z6Q@cluster0.tgbkd.mongodb.net/Cluster0?retryWrites=true&w=majority"
  //uri: DATABASE_URI,
};

const privateKeys = {
  jwtPrivateKey: "C@<Jf/@BU8+cX.I^U)kGblL^i(DmN.gR-@o%}LiCg:Y>NAC|]QcE2`j<I-)CGR|Ck=zE2(", 
  cookiePrivateKey: "/rg|x]|9-sz:`)`<~On^;l}|J-u)|2Ix]Gy-v%$2c?(tk~B}G-)]$]^_+C}-Vx}",
  //jwtPrivateKey: JWT_TOKEN,
  //cookiePrivateKey: COOKIE_TOKEN,
  };

exports.serverConfig = serverConfig;
exports.databaseConfig = databaseConfig;
exports.privateKeys = privateKeys;
