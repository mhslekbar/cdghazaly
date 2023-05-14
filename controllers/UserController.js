const UserModel = require("../models/UserModel")
const CryptoJS = require("crypto-js");

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: users })
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

const createUser = async (req, res) => {
  try {
    const { username, password, phone, roles, doctor } = req.body
    const formErrors = [];
    const checkUser = await UserModel.findOne({username});
    if(checkUser) {
      formErrors.push("Nom d'utilisateur Deja existe");
    }
    if(username.length === 0) {
      formErrors.push("Nom d'utilisateur est obligatoire !");
    }
    if(password.length === 0) {
      formErrors.push("Mot de passe est obligatoire !");
    }
    if(phone.length === 0) {
      formErrors.push("Numero de telephone est obligatoire !");
    }
    if(roles.length === 0) {
      formErrors.push("Ajouter au moins un role !");
    }
    
    const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString()

    if(formErrors.length === 0) {
      await UserModel.create({ username, password: encryptedPassword, phone, roles, doctor })
      await getUsers(req, res)
    } else {
      res.status(300).json({ formErrors})
    }
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
} 

const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const userData = await UserModel.findById(id)
    const { username, password, phone, roles, doctor } = req.body
    const formErrors = [];
    const checkUser = await UserModel.findOne({ _id: {$ne: id},  username });
    
    if(checkUser) {
      formErrors.push("Nom d'utilisateur Deja existe");
    }
    if(username.length === 0) {
      username = userData.username
    }
    if(password.length === 0) {
      password = userData.password
    }
    if(phone.length === 0) {
      phone = userData.phone
    }
    if(roles.length === 0) {
      roles = userData.roles
    }
    
    const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString()

    if(formErrors.length === 0) {
      await UserModel.updateOne({_id: id}, { username, password: encryptedPassword, phone, roles, doctor }, { new: true })
      await getUsers(req, res)
    } else {
      res.status(300).json({ formErrors})
    }

  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const formErrors = []
    // start check if there's a patient or if payment has made
    // end check if there's a patient or if payment has made
    if(formErrors.length === 0) {
      await UserModel.findByIdAndDelete(id)
      await getUsers(req, res)
    } else {
      res.status(300).json({ formErrors })
    }
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

module.exports = { getUsers, createUser, updateUser, deleteUser }