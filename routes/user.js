const express=require('express')
const router=express.Router()

const {handelUserSignup,getUserData,handelUserLogin,logOut,guestlogin}=require('../controllers/user')
// const getUser=require('../controllers/user')


router.post("/signup",handelUserSignup)
// router.get("/data",getUserData)
router.post("/login",handelUserLogin)
router.get("/logout",logOut)
router.post("/guest",guestlogin)



module.exports =router;