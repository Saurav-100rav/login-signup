const express = require ("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

router.post("/login",async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email:email});
        if(!user){
            res.json({"msg":"User not registered in database..."});
        }
        else{
            const hashed_password = user.password;
            const compare_password=await bcrypt.compare(password,hashed_password);
            if(compare_password){
                console.log(`${user.name.split(" ")[0]} ,Login Successfull.`);
                res.json({"msg":"Success",user:user})   
                // const payload = {
                //     user : {
                //         id:user.id
                //     }
                // }
                // const authToken = jwt.sign(payload,jwt_secret_token);
                // res.json({authToken});
                // res.json({"msg":"Login Successfull",authToken});
            }
            else{
                console.log("wrong behaviour found while logging...");
                res.json({"msg":"suspected behaviour, password not matched.."});
            }
        }
    } catch (error) {
        console.log("Error while logging User...");
        res.send(error); 
    }
})

router.post("/register",async(req,res)=>{
    // console.log(req.body,req.body.fullname,req.body.email);
    try {
        const name = req.body.fullname;
        const {email,password} = req.body;
        const oldUser =await User.findOne({email:email})
        if(oldUser)
        res.json({"msg" : "user already registered"}) 
        else{
            const salt = await bcrypt.genSalt(10);
            const secure_password = await bcrypt.hash(password,salt);
                const newUser = new User({
                    name,   // name:name  ,shorthand here
                    email,
                    password:secure_password
                })
            await newUser.save();
            console.log(`${newUser.name.split(" ")[0]} added successfully ....`);
            res.json({"msg":"Sucsess",newUser});
            }
    } catch (error) {
        console.log("Error while Registering User...");
        res.send(error); 
    }
    })  

module.exports = router;