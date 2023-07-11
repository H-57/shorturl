const express = require("express");
const dbConnect = require("./db/dbconn");

require("dotenv").config();
const cookieParser=require('cookie-parser')
const port = process.env.Port;
const {restrictToLoggenInUserOnly}=require('./middlewares/auth')
const bodyParser = require('body-parser');


const app = express();
// routes

const userRoute=require('./routes/user')
const staticFIleRoute=require('./routes/staticRoutes')
const homeroute=require('./routes/home')
const Url=require('./routes/shortLinks')
// cnnect with database
dbConnect();
// json middleware
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())
app.set('view engine','ejs')
const ejs=require("ejs")

//middlewares for routes
app.use("/user",userRoute) 
app.use("/user",staticFIleRoute)
app.use('/',Url)

app.use("/",restrictToLoggenInUserOnly,homeroute)


app.get("*",(req,res)=>{
  res.status(404).send("page not found")
})


app.listen(port, () => {
  console.log(`sever is start at http://127.0.0.1:${port}`);
});


