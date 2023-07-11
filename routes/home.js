const express=require('express')
const Url=require("../models/url")
const {getUser}=require("../service/auth")
const router=express.Router()

router.get("/", async(req, res) => {
 
    const token=req.cookies.uid
    const decode=getUser(token)
  
    const createdBy = decode._id;
    console.log(createdBy)
    let linksData=[]
    if(createdBy){
        linksData=await Url.find({createdBy,})
        
      }
      res.render('home',{title:"Url's shortner",linksData,login:true});

  });
  module.exports=router