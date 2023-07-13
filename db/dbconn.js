const mongoose = require("mongoose");


const connect=()=>{


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(() => {
    console.log("Error connecting to DB");
  });
}
  module.exports=connect;
