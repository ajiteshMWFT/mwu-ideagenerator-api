const express = require("express")
const dotenv = require("dotenv");
const connectDB = require("./utlis/db");
const ideaRoute = require("./routes/ideas");
const cors = require("cors");
const { openai_api } = require("./utlis/config");
const logoRoute = require("./routes/logo-generator");
dotenv.config();
connectDB();
const app = express();
app.use(cors(
   { origin: '*'}
));
app.use(express.json());
app.set('trust proxy', true)
app.use("/api/generate-idea/", ideaRoute);
app.use("/api/generate-logo/", logoRoute);

app.get('/', (req, res) => {
    res.send(req.socket.remoteAddress)
})
const PORT = process.env.PORT;
const server = app.listen(
    PORT,
    console.log(`Server running on PORT ${PORT}...`)
);
console.log(openai_api); 
