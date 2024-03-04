const express = require("express");
const { isAuth } = require("../middleware/isAuth");
const {
    getMessages,
    sendMessage
} = require("../controllers/message");

const router = express.Router();

router.get("/messages", getMessages);
router.post("/send-message", sendMessage);
module.exports = router;
