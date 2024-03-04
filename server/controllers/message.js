const Message = require("../models/message");

const sendMessage = async (req, res, next) => {
  try {
    const { senderId, recipientId, message } = req.body;

    const msg = new Message({
      senderId,
      recipientId,
      message,
    });

    const response = await msg.save();

    res.status(201).json({
      message: "message has been sent",
      success: true,
      data: response,
    });
  } catch (error) {
    console.log(error);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({});

    res.status(200).json({
      message: "messages fetched successfully",
      success: true,
      data: messages,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendMessage, getMessages };
