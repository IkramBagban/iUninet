const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    //name ,password, email
    name: {
        type: String,
        required: true,
        min: 2,
        max: 50,

    },
    password: {
        type: String,
        required: true,
        min: 5,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    resetlink: {
        type: String,
        default: " "
    }

});

module.exports = new mongoose.model("User", UserSchema);