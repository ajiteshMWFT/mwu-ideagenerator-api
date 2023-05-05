const express = require("express")
const dotenv = require("dotenv");
const connectDB = require("./utlis/db");
const ideaRoute = require("./routes/ideas");
const cors = require("cors");
const { openai_api } = require("./utlis/config");
dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/generate-idea/", ideaRoute);

app.get('/', (req,res)=>{
    res.send("hi")
})
const PORT = process.env.PORT ;
const server = app.listen(
    PORT,
    console.log(`Server running on PORT ${PORT}...`)
);
console.log(openai_api); 
