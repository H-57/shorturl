// const sessionIdToUseMap=new Map();

// function setUser(id,user){
//     sessionIdToUseMap.set(id,user)

// }
// function getUser(id){
//     sessionIdToUseMap.get(id)

// }
require("dotenv").config();
const jwt = require("jsonwebtoken");
const secrateKey = process.env.Jwt_Skey;

const setUser = (User) => {
  const {_id,email,name}=User
  const tocken=jwt.sign({_id,email,name }, secrateKey, { expiresIn: "12h" })
  return tocken
};

const getUser = (tocken) => {
  try {
    const auth= jwt.verify(tocken, secrateKey)
    return auth
  } catch (error) {
    // console.log(error)
    return false
  }
  
}
module.exports = {
  getUser,
  setUser,
};
