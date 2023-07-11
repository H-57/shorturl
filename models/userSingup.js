const mongoose=require('mongoose')

const userSignupSchema=mongoose.Schema({
    name: {
        type: String,
        required: [true,"plz enter the name"],
        minimum: [4, 'plz enter minimum 4 length password']

    },
    email: {
        type: String,
        unique:[true,"email is al"],
        required: [true,"plz enter the email"]
    },
    password:{
        type: String,
        required: [true,"plz enter the password"],
        minimum: [6, 'plz enter minimum six length password'],
        
    }
 

    
       
    
},{
    timestamps: true,
})

module.exports=mongoose.model("user",userSignupSchema)