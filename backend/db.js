const mongoose =require("mongoose");
mongoose.connect("mongodb://localhost:27017/paytm")

const userScheme=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    }
})

const User=mongoose.model("User",userScheme);

const accountSchema=mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:User,
        required: true
    },
    balance:{
        type:Number ,
        required:true 
    }
})
const Account = mongoose.model("Account",accountSchema)
module.exports={
    User,
    Account
}