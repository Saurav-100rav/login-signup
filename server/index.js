const express = require("express");
const app = express(); 
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

const port = process.env.PORT || 3050;

const connect_database = require("./database/db");
connect_database();

const allroutes = require("./routes/route")
app.use("/",allroutes);

app.get("/",(req,res)=>{
    res.send("Welcome on login-signup App.....");
})
const start_server = ()=>{
    try {
        app.listen(port,()=>{
            console.log(`Server is running on port : ${port}`);
        })
    } catch (error) {
        console.log("Error while starting Backend server....",error);
    }
}
start_server();