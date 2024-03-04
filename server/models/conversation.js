const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  ],

  conversation: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = mongoose.model("conversation", conversationSchema);
