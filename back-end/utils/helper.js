/* 
    Global function start
*/
const express = require("express");
const crypto = require("crypto");
const { nanoid } = require("nanoid");
//Function to generate uid
const generateTransactionId = (prefix) => {
  const timestamp = Date.now();
  const uniqueId = nanoid(5);
  return `${prefix}${timestamp}/${uniqueId}`;
};
/* 
      Global function end
  */
const keyGenerator = () => {
  return crypto.randomBytes(32).toString("hex");
};
const secretKey = () => {
  return process.env.JWT_SECRET;
};

module.exports = {
  generateTransactionId,
  keyGenerator,
  secretKey,
};
