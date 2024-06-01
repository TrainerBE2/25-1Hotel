/* 
    Global function start
*/
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

module.exports = {
  generateTransactionId,
};
