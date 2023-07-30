const express=require("express")
const cors=require("cors")
require("dotenv").config()
const mongoose=require("mongoose")

// ...Connection Mongo...........

const Connection=mongoose.connect(process.env.MongoURL)

// .........Schema................
const UserSchema=mongoose.Schema({
    username:String,
    pass:String
})

// .................Model................

const UserModel=mongoose.model("user",UserSchema)


// ................Express App.........
const app=express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Soc Server Home Page")
})
// ............Post Route............


app.post("/user",async(req,res)=>{
    const {username,pass}=req.body
    try {
        const user=new UserModel({username,pass})
        await user.save()
        res.status(201).send({msg:"User Added"})
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
})



app.listen(process.env.PORT,async()=>{
    try {
        await Connection
        console.log("Connected  to DB")
    } catch (error) {
        console.log("Server Running")
    }
})