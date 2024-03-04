const Message = require("../models/message");
const Conversation = require("../models/conversation");

const sendMessage = async (req, res, next) => {
  try {
    const { senderId, recipientId, message } = req.body;

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
    console.log(error);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const { senderId, recipientId } = req.params;
    const conversation = await Conversation.find({
      participants: { $all: [senderId, recipientId] },
    }).populate("messages");

    console.log("conversation", conversation);
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
