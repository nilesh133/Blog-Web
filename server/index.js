const express = require("express");
const app = express();
const dotenv = require("dotenv");
const PORT = process.env.PORT || 6200
const connect = require("./config/db");
const router = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const profileRoutes = require("./routes/profileRoutes");
const bodyParser = require("body-parser");
const path = require("path")

dotenv.config();

connect();
app.use(bodyParser.json());
app.use("/", router);
app.use("/", postRoutes);
app.use("/", profileRoutes);

__dirname = path.resolve();
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "/client/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}
else{
    app.get("/", (req, res) => {
        res.send("API is running");
    })
}



app.listen(PORT, () =>{
    console.log(`Successfully running on port no. ${PORT}`);
})