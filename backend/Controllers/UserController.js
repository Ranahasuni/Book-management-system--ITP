const User = require("../Model/UserModel");
//display part
const getAllUsers = async (req,res,next)=>{

    let users;

    try{// return database
        users = await User.find();
    }catch(err){
        console.log(err);
    }
    //not found
    if(!users){
        return res.status(404).json({message:"user not found"});
    }
    //display all users
    return res.status(200).json({users});




};
//data insert
const addUsers = async(req,res,next)=>{

    const{name,gmail,age,address} = req.body;

    let users;

    try{
        //userge call krgaththu details const
        users = new User({name,gmail,age,address});
        //to save in database
        await users.save();

    }catch(err){
        console.log(err);
    }
    //not inserting users
    if(!users){
        return res.status(404).json({message:"unable to add users"});

    }
    return res.status(200).json({ users });




};
//retrieve data Get by Id
const getById = async(req,res,next)=>{

    const id = req.params.id;

    let user;

    try{
       user = await User.findById(id);
    }catch(err){
        console.log(err);
    }
      //not available users
    if(!user){
        return res.status(404).json({message:"User not found"});

    }
    return res.status(200).json({ user });

};
//update
const updateUser = async(req,res,next)=>{

     const id = req.params.id;
     const{name,gmail,age,address} = req.body;

     let users;

     try{
        users = await User.findByIdAndUpdate(id,{name:name,gmail:gmail,age:age,address:address});
        users =await users.save();
     }catch(err){
        console.log(err);
     }
      if(!users){
        return res.status(404).json({message:"Unable to update user details"});

    }
    return res.status(200).json({ users });

};
//delete
 const deleteUser =async(req,res,next)=>{

    const id = req.params.id;

    let user;

    try{
        user = await User.findByIdAndDelete(id)
    }catch(err){
        console.log(err);
    }
    //validation
      if(!user){
        return res.status(404).json({message:"Unable to delete user "});

    }
    return res.status(200).json({ user});

 };


exports.getAllUsers=getAllUsers;
exports.addUsers= addUsers;
exports.getById= getById;
exports.updateUser =updateUser; 
exports.deleteUser= deleteUser;