const express = require("express");
const router = express.Router();
const {isAuth} = require("../middleware/isAuth");

// isAuth;

const { getUsers } = require("../controllers/user");

router.get("/", isAuth, getUsers);

module.exports = router;