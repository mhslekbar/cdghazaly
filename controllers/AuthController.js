const CryptoJS = require("crypto-js");
const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const generateAccessToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_SEC, { expiresIn: "15d" });

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username});
    if (!user) {
      res.status(300).json({ formErrors: "Username is wrong!!" });
    } else {
      // start get password and decrypt it
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
      );
      const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      // end get password and decrypt it
      
      if (OriginalPassword !== password) {
        res.status(300).json({ formErrors: "Wrong Password" });
      } else {
        const accessToken = generateAccessToken(user);
        const { password, ...others } = user._doc;
        res.status(200).json({ success: { ...others, accessToken } });
      }
    }
  } catch (err) {
    // console.log(err)
    res.status(500).json({ err: err.message });
  }
};

module.exports = { login };
