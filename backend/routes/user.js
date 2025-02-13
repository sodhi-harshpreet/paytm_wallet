const express=require("express");
const router=express.Router();
const zod=require("zod");
const { User, Account } = require("../db");
const jwt=require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { authMiddleware } = require("../middleware");

const signupSchema=zod.object({
    username:zod.string().email(),
    password:zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

router.post("/signup",async (req,res)=>{
    const body=req.body;
    const {success}=signupSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"Invalid data "
        })
    }
    const user=await User.findOne({
        username:req.body.username 
    })
    if(user) {
        return res.status(411).json({
            message:"Email already exists"
        })
    }
    const dbuser=await User.create(body)
    const userId=dbuser._id
    const token=jwt.sign({
        userId
    }, JWT_SECRET)

    Account.create({
        userId:userId,
        balance:1+Math.random()*10000
    })

    res.json({
        message: "User created successfully",
        token: token
    })
})

const signinbody=zod.object({
    username:zod.string().email(),
    password:zod.string()
})

router.post("/signin", async (req,res)=>{
    const {success}=signinbody.safeParse(req.body);
    if(!success){
        return res.status(403).json({
            message:"Invalid details"
        })
    }
    const user=await User.findOne({
        username:req.body.username,
        password:req.body.password
    })
    if(user){
        const token=jwt.sign({
            userid:user._id
        },JWT_SECRET)
        res.json({
            token:token
        })
        return
    }
    res.status(411).json({
        message:"error while logging in"
    })
})

const updateBody=zod.object({
    password:zod.string().optional,
    firstName:zod.string().optional,
    lastName:zod.string().optional
})

router.put("/", authMiddleware,async(req,res)=>{
    const {success}=updateBody.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message:"error while updating information"
        })
    }

    await User.updateOne(req.body,{
        id:req.userId
    })
    res.json({
        message:"updated successfully!"
    })

})

router.get("/bulk", async ( req,res)=>{
    const filter=req.query.filter||""

    const users=await User.find({
        $or:[{
            firstName:{
                "$regex": filter 
            }
        },{
            lastName:{
                "$regex": filter
            }
        }]
    })
    res.json({
        user: users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})

// router.get("/",(req,res)=>{
//     res.json({
//        message: "hello world"
//     })
// })

module.exports=router