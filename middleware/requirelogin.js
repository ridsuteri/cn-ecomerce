const JWT = require("jsonwebtoken");

const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(422).json({ error: "not authorized" });
  }
  const token = authorization.replace("bearer ", "");
  JWT.verify(token, process.env.JWTTOKENS, (err, payload) => {
    if (err) {
      return res.status(402).json({ error: "not verify" });
    }
    const { _id } = payload;
    User.findById(_id).then((userdata) => {
      req.user = userdata;
      next();
    });
  });
};
