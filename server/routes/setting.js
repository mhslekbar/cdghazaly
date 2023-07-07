const router = require("express").Router()
const { getSettings, createSetting, updateSetting, deleteSetting } = require("../controllers/SettingController")

router.get("/", getSettings)
router.post("/", createSetting)
router.put("/:id", updateSetting)
router.delete("/:id", deleteSetting)

module.exports = router