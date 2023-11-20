const express = require("express");

const mongoose = require("mongoose");

const bodyParser =  require("body-parser");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

const port = process.env.PORT || 3000;
const username = process.env.MONGODB_USERNAME;

const password = process.env.MONGODB_PASSWORD;
const connectDB = ()=>{
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.2oivhew.mongodb.net/registreationformdb`,{
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(()=>{
    console.log("DB connection successful.");
})
.catch((err)=>{
    console.log(`DB connection error:${err}`);
});

}
const registrationSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String
});
const Registation = mongoose.model("Registation", registrationSchema);
app.use(bodyParser.urlencoded ({extended : true}));
app.use(bodyParser.json());












app.get("/",( req,res)=>{
res.sendFile(__dirname + "/pages/index.html")

})

app.post("/register", async ( req,res)=>{
   
try{
const {name , email , password}= req.body;

const existingUser = await Registation.findOne({email : email});
if(!existingUser){
    const registationData  = new Registation({

        name,
        email,
        password
    });
    await registationData.save();
    res.redirect("/success");
    
    }
  

else{
    console.log("user already ")
    res.redirect("/error")
}}



catch(error){
console.log(error);
res.redirect("error")
}

    })
    

app.get("/success", (req,res)=>{
    res.sendFile (__dirname + "/pages/success.html")
})

app.get("/error", (req,res)=>{
    res.sendFile (__dirname + "/pages/error.html")
})









app.listen(port,()=>{
    console.log(`server is ruuninig port num 300 ${port}`);
})