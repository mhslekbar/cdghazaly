const os = require("node:os")
const SettingModel = require("../models/SettingModel")

const networkInterfaces = os.networkInterfaces();
const macAddress = networkInterfaces?.en1?.find((iface) => iface?.mac !== '00:00:00:00:00:00')?.mac;

const checkComputer = async (req, res, next) => {
  try {
    // console.log("macAddress: ", macAddress)
    // next()
    const settings = await SettingModel.findOne({ "company.macAllowed": macAddress })
    if(settings) {
      next()
    } else {
      res.status(300).json("This machine is not authorized.")
    }
  } catch (err) {
    res.status(500).json({err: err.message})
  }
}

module.exports = { checkComputer }