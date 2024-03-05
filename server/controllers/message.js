const Message = require("../models/message");
const Conversation = require("../models/conversation");
const { throwError } = require("../utils/throwError");

const sendMessage = async (req, res, next) => {
  try {
    console.log("In sendMessage");
    const { recipientId } = req.params;
    const { message } = req.body;
    const senderId = req.user._id;
    console.log("recipientId", recipientId);
    console.log("senderId", senderId);

    if (!recipientId || !message || !senderId) {
      throwError("recipientId, senderId and message are required fields", 400);
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recipientId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, recipientId],
      });
    }

    const newMessage = new Message({
      senderId,
      recipientId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json({
      message: "message has been sent",
      success: true,
      data: newMessage,
    });
  } catch (error) {
    next(error);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const { recipientId } = req.params;
    const senderId = req.user._id;
    // console.log('user', )

    const conversation = await Conversation.find({
      participants: { $all: [senderId, recipientId] },
    }).populate("messages");

    // console.log("conversation", conversation);
    res.status(200).json({
      message: "messages fetched successfully",
      success: true,
      data: conversation,
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

module.exports = { sendMessage, getMessages };
