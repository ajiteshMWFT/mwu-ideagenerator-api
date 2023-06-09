const express = require("express");

const { rateLimit } = require("../middleware/req-limiter");
const { generateIdea } = require("../controllers/idea-controller");

const router = express.Router();

router.post("/",rateLimit, generateIdea)



module.exports = router;