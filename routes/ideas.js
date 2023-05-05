const express = require("express");
const { generateIdea } = require("../controllers/idea-controller");

const router = express.Router();

router.post("/", generateIdea)



module.exports = router;