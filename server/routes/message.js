const express = require("express");
const { isAuth } = require("../middleware/isAuth");
const {
    getMessages,
    sendMessage
} = require("../controllers/message");

const router = express.Router();

router.get("/messages/:senderId/:recipientId", getMessages);
router.post("/send-message", sendMessage);
module.exports = router;
