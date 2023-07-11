const mongoose=require('mongoose')

const guestSignupSchema=mongoose.Schema({
    name: {
        type: String,
        required: [true,"plz enter the name"],
        minimum: [4, 'plz enter minimum 4 length password']

    },
    
 

    
       
    
},{
    timestamps: true,
})

module.exports=mongoose.model("guesUser",guestSignupSchema)