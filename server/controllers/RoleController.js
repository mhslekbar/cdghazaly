const UserModel = require("../models/UserModel")
const RoleModel = require("../models/RoleModel")

const getRoles = async (req, res) => {
    try {
        const roles = await RoleModel.find().populate("permissions").sort({createdAt: -1})
        res.status(200).json({ success: roles})
    } catch(err) {
        res.status(500).json({err: err.message})
    }
}

const insertRole = async (req, res) => {
    try {
        const formErrors = [];
        const { name } = req.body 
        const roleData = await RoleModel.find({name})
        
        if(roleData.length > 0) {
            formErrors.push("Le nom existe deja");
        }
        if(name.length === 0) {
            formErrors.push("Le nom du role est obligatoire");
        }
        if(formErrors.length === 0) {
            await RoleModel.create({ name });
            await getRoles(req, res)
        } else {
            res.status(300).json({formErrors});
        }
    } catch(err) {
        console.log(err)
        res.status(500).json({err});
    }
} 

const updateRole = async (req, res) => {
    try {
        const {id} = req.params;
        let { name, permissions } = req.body;
        const role = await RoleModel.findOne({ _id: {$ne: id}, name });
        const formErrors = [];

        if(role) {
            formErrors.push("Le nom existe deja");
        }
        if(name?.length === 0) {
            name = role.name;
        }
        if(name?.length < 2) {
            formErrors.push("Le nom du role doit etre superieur a 3 caracteres")
        }

        if(formErrors.length === 0) {
            await RoleModel.updateOne({_id: id}, {$set: { name, permissions }}, {new: true});
            await getRoles(req, res)
        } else {
            res.status(300).json({formErrors});
        }
    } catch(err) {
        res.status(500).json({err});
    }
}

const deleteRole = async (req, res) => {
    try {
        const {id} = req.params;         

        const users = await UserModel.find();
        users.map(async user => {
            const newRole = user.roles.filter(role => !role.equals(id))
            await UserModel.updateOne({_id: user._id}, { $set: { roles: newRole } } , {new: true});
        })
        await RoleModel.findByIdAndDelete(id);
        await getRoles(req, res)

    } catch(err) {
        res.status(500).json({err});
    }
}

module.exports = { getRoles, insertRole, updateRole, deleteRole };
