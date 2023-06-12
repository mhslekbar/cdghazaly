const PermissionModel = require("../models/PermissionModel");
const UserModel = require("../models/UserModel")

const getPermissions = async (req, res) => {
    try {
        const { userId } = req.query  
        let permission
        if(userId) {
            const userData = await UserModel.findOne({_id: userId}).populate({
                path: "groups",
                populate: {
                    path: "permissions"
                }
            })
            let allowedPermission = []
            for(let grp of userData.groups) {
                allowedPermission.push(grp.permissions)
            }
            permission = allowedPermission[0]
        } else {
            permission = await PermissionModel.find().sort({createdAt: -1})
        }
        res.status(200).json({success: permission});
    } catch (err) {
        res.status(500).json({err})
    }
}

const getPermissionsByTable = async (req, res) => {
    try {
        const permission = await PermissionModel.aggregate([
            { 
                $project: {
                    createdAt: 1, 
                    collectionName: 1
                }
            },
            {$group: {
                _id: "$collectionName",  
                data: { $push: "$$ROOT" }              
            }},
            {$sort: {"data.createdAt": -1}},
        ]);
        res.status(200).json({success: permission});
    } catch (err) {
        res.status(500).json({err})
    }
}

const createPermission = async (req, res) => {
    try {
        const formErrors = [];
        const { name, collectionName } = req.body 

        const PermissionData = await PermissionModel.findOne({ name });

        if(PermissionData) {
            formErrors.push("Le nom du Permission deja existe");
        }
        if(name.length === 0) {
            formErrors.push("Le nom du Permission est obligatoire");
        }
        if(collectionName.length === 0) {
            formErrors.push("Le choix du nom de la collection est obligatoire");
        }
        if(formErrors.length === 0) {
          await PermissionModel.create(req.body);
          await getPermissions(req, res)
        } else {
          res.status(300).json({formErrors});
        }
    } catch (err) {
        res.status(500).json({err})
    }
}

const updatePermission = async (req, res) => {
    try {
        const {id} = req.params;
        const { name, collectionName } = req.body 
        const formErrors = [];
        const checkPermission = await PermissionModel.findOne({ $ne: {_id: id}, name });
        const PermissionData = await PermissionModel.findOne({ name });

        if(checkPermission) {
          formErrors.push("Le nom du Permission deja existe");
        }
        if(name.length === 0) {
            name = PermissionData.name
        }
        if(collectionName.length === 0) {
            collectionName = PermissionData.collectionName
        }
        if(formErrors.length === 0) {
          await PermissionModel.updateOne({_id: id}, {$set: req.body}, {new: true});
          await getPermissions(req, res)
        } else {
          res.status(300).json({formErrors});
        }
    } catch (err) {
      res.status(500).json({err})
    }
}

const deletePermission = async (req, res) => {
    try {
        const {id} = req.params;
        await PermissionModel.deleteOne({_id: id});
        await getPermissions(req, res)
      } catch (err) {
        res.status(500).json({err})
    }
}

module.exports = { getPermissions, getPermissionsByTable, createPermission, updatePermission, deletePermission }
