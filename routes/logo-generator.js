const express = require("express");
const { rateLimit } = require("../middleware/req-limiter");
const { generateLogo } = require("../controllers/logo-controller");

const router = express.Router();
 
router.post("/",rateLimit, generateLogo)



module.exports = router;