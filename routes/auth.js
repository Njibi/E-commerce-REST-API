const router = require('express').Router() ;
const User = require('../models/User') ;
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

router.post("/signup", async (req,res)=>{
 const newUser = new User({
    userName : req.body.userName ,
    email : req.body.email ,
    password : cryptoJS.AES.encrypt(req.body.password , process.env.PASSWORD_SECRET).toString()
 }) ;

 try{
    const savedUser =  await newUser.save()
    res.status(201).json(savedUser)
 }catch(error){
    res.status(500).json(error)
 }

}) ;

// LOGIN

router.post("/login", async (req, res)=>{
   try {
      const user = await User.findOne({userName : req.body.userName})
      if(!user) { res.status(401).send("Incorrect details")}
      const hashedPassword = await cryptoJS.AES.decrypt(
        user.password,
        process.env.PASSWORD_SECRET
    );
    const decodedPassword = await hashedPassword.toString(cryptoJS.enc.Utf8)
    if(decodedPassword !== req.body.password) { return res.status(401).send('incorrect password')}
    else{
         const accessToken = jwt.sign({
            id : user._id , isAdmin : user.isAdmin
         }, process.env.JWT_SECRET, {
            expiresIn : "3h" })

        const {password,  ...others} = user._doc;
        res.status(201).json({...others, accessToken});
    }
   } catch (error) {
    res.status(401).json({error : error})
   }
})

module.exports = router 