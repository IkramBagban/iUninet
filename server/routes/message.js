const express = require("express");
const { isAuth } = require("../middleware/isAuth");
const { getMessages, sendMessage } = require("../controllers/message");

const router = express.Router();

router.get("/messages/:recipientId", isAuth, getMessages);
router.post("/send-message/:recipientId", isAuth, sendMessage);
module.exports = router;
