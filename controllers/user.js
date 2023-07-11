
const user=require('../models/userSingup')
const guest=require('../models/guestUser')
const{ setUser }=require('../service/auth')


// handel signup and create user


const handelUserSignup=async (req,res)=>{
    const{name,email,password}= req.body
    if(!email||!password||!name){

        return  res.status(404).json({message:"plz fill  fields",status:"error"})
  
      }
    const userExist=await user.find({email,})
    if(userExist.length > 0) return res.json({message:"this email is used already",status:"error"})
    try {
        const userData= await user.create({name,email,password})
        console.log(userData)
        res.json({message:"Account created sucessfully",status:"ok"})
      
    } catch (error) {
        res.send(error.message)
    }
      

}

// handle login and analysis
const handelUserLogin=async (req,res)=>{
    const{email,password}= req.body


    if(!email||!password){

      return  res.json({message:"plz fill  fields",status:"error"})

    }
    

    try {
        const User=await user.findOne({email})
      

        if(!User){
            return res.status(404).json({message:"plz enter right email info",status:"error"})
            }

          
        if(User.password!=password){
          return  res.status(404).json({message:"plz enter right password info",status:"error"})
            }
       
           
           const tocken= setUser(User)
            await res.cookie("uid",tocken)
           
            res.json({message:"login sucess",status:"ok "})
            
           
           
    } 
    catch (error) {
        res.send(error.message)
    }
      

}
const logOut=async(req,res)=>{
res.clearCookie("uid");
res.redirect('/user/login')

}
// handel guest user 
const guestlogin=async (req,res)=>{


    const GuestUser=guest.create({name:"Guest"})
    const tocken= setUser(GuestUser)
    await res.cookie("uid",tocken)
    res.redirect("/")

}

const getUserData=async(req,res)=>{
    try {
        const users=await user.find()
        res.json(users)
    } catch (error) {
        res.send(error.message)
    }
    
}

module.exports={handelUserSignup,getUserData,handelUserLogin,logOut,guestlogin}