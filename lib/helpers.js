const base64 = (str) => Buffer.from(str).toString("base64");
const fromBase64 = (str) => Buffer.from(str, "base64").toString();

module.exports = {
  base64,
  fromBase64,
};
