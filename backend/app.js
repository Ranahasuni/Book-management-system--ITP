
//password=7voDyqMcC4dExxmU
const express = require("express");
const mongoose = require("mongoose");
const router =require("./Routes/UserRoutes");

const app = express();
const cors= require("cors");

//middleware

app.use(express.json());
app.use(cors());
app.use("/users",router);
app.use("/files",express.static("files"));


// mongoose.connect("mongodb+srv://admin:7voDyqMcC4dExxmU@cluster0.egi66ot.mongodb.net/")
.then(()=>console.log("Connected to MongoDB"))
.then (()=>{
    app.listen(5000);
})
.catch((err)=>console.log((err)));

//call Register Model
require("./Model/Register");
const User= mongoose.model("Register")
app.post("/register",async(req,res)=>{
    const {fullname,email,password,address,gender} =req.body;
    try{
        await User.create({
            fullname,
            email,
            password,
            address,
            gender,
        })
        res.send({status:"ok"});

    }catch(err){
        res.send({status:"err"});
    }
});
//login
app.post("/login",async(req,res)=>{
    const {email,password}= req.body;
    try{
        const user= await User.findOne({email});
        if(!user){
         return res.json({err:"user not found"})   
        }
        if(user.password===password){
            return res.json({status:"ok"});
        }else{
            return res.json({err:"incorrect Password"});
        }
    }catch(err){
        console.error(err);
         res.status(500).json({err:"server Err"})
        
    }
});
//pdf
const multer= require("multer");
const storage =multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./files')
    },
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now()
        cb(null,uniqueSuffix + file.originalname);
    },
});
//insert model part
require("./Model/PdfModel")
const pdfSchema = mongoose.model("PdfDetails");
const upload = multer({storage})

app.post("/uploadfile",upload.single("file"),async(req,res)=>{
   
try{
    console.log("BODY:",req.body);
    console.log("FILE:",req.file);
    const title= req.body.title;
    const pdf= req.file.filename;
        await pdfSchema.create({title:title,pdf:pdf});
        console.log("pdf Uploaded successfully");
        res.send({status:200});
    }catch(err){
        console.log(err);
        res.status(500).send({ status:"error"});
    }

});
app.get("/getFile",async(req,res)=>{
    try{
        const data = await pdfSchema.find({});
        res.send({status:200,data:data});
    }catch(err){
       console.log(err);
       res.status(500).send({status:"error"});
    }
});
//image part
 require("./Model/ImgModel");
 const ImgSchema =mongoose.model("ImgModel");

 const multerimg =require("multer");

 const storageimg = multer.diskStorage({

    destination: function(req,file,cb){
        cb(null,"../frontend/src/Components/ImgUploader/files")
    },
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now();
        cb(null,uniqueSuffix +file.originalname);
    }

 });

 const uploadimg =multerimg({storage: storage});

 app.post("/uploadImg",uploadimg.single("image"),async(req,res)=>{
    console.log(req.body);
    const imageName= req.file.filename;
    try{
        await ImgSchema.create({image:imageName});
        res.json({status:"ok"});
    }catch(error){
         res.json({status:error});

    }
 });
 //display image

 app.get("/getImage",async(req,res)=>{
    try{
    ImgSchema.find({}).then((data)=>{
        res.send({status:"ok",data:data});
    });
    }catch(error){
        res.json({status:error});
    }
 });



