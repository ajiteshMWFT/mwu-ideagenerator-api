const express = require("express");
const { generateIdea } = require("../controllers/idea-controller");
const { rateLimit } = require("../middleware/req-limiter");

const router = express.Router();

router.post("/",rateLimit, generateIdea)



module.exports = router;