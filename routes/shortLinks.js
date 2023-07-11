const express=require('express')
const router=express.Router()
const {linkShortner,getLink,fetchLinks}=require("../controllers/linkShort")
const{restrictToLoggenInUserOnly}=require('../middlewares/auth')

router.post("/shorturl",restrictToLoggenInUserOnly,linkShortner)
router.get("/geturl",restrictToLoggenInUserOnly,fetchLinks)
router.get("/:id",getLink)


module.exports=router