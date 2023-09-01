const UserModel = require("../models/UserModel");

const authorizedPermission = (permission = [], collectionName) => {
  return async (req, res, next) => {
    const { id } = req.user;

    const users = await UserModel.findById(id).populate("roles");
    let hasPermission = false;

    for (const role of users.roles || []) {
      const populatedRole = await role.populate("permissions");
      if (
        populatedRole.permissions.find((p) => permission.includes(p.name) && p.collectionName === collectionName)
      ) {
        hasPermission = true;
        break;
      }
    }
    if (hasPermission) {
      return next();
    } else {
      return res
        .status(300)
        .json(`Vous n'etes pas autoriser à : ${permission[0].toLowerCase()} ${collectionName.toLowerCase()}`); // 
    }
  };
};

module.exports = { authorizedPermission };
