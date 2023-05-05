const dotenv = require("dotenv");

dotenv.config();

const openai_api = process.env.OPENAI_API_KEY

module.exports = { openai_api }