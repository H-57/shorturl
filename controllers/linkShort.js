const Url = require("../models/url");
const { nanoid } = require("nanoid");
const jwt = require("jsonwebtoken");
const{getUser}=require("../service/auth")


const linkShortner = async (req, res) => {
    const { url } = req.body;
    console.log(url);


    if (!url) {
        res.json({ status: "error", message: "plz enter the url" });
    }
   
  
    try {
        
const token=req.cookies.uid
        const decode=getUser(token)
      
        const createdBy = decode._id;
        console.log('User ID:', createdBy);

        

        const shortUrl = nanoid(8);
        const redirectUrl = url;
        
        const shortlink = await Url.create({ shortUrl, redirectUrl,createdBy });
        // console.log(shortlink);
        let linksData=await Url.find({createdBy,})
        res.render("home", { link: shortUrl, title: "url shortner", linksData,login:true});
       
    } catch (error) {
        res.render("invalidUrl")
        // res.json({ status: "error", message: "something went wrong" });
    }
};

const getLink = async (req, res) => {
    const shortUrl = req.params.id;

    try {
        const result = await Url.findOneAndUpdate(
            { shortUrl },
            { $push: { visitHistory: { timestamps: Date.now() } } }
        );

        res.redirect(result.redirectUrl);
    } catch (error) {
        res.render("invalidUrl");
    }
};



const fetchLinks = async (req, res) => {
    try {
        const token=req.cookies.uid
        const decode=getUser(token)
      
        const createdBy = decode._id;
        if(createdBy){
            let linksData=await Url.find({createdBy,})
            res.json({linksData})
        }
    } catch (error) { }
};
module.exports = { getLink, linkShortner,fetchLinks };
