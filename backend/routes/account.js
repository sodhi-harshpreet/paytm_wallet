const express=require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");
const router=express.Router();

router.get("/balance",authMiddleware,async(req,res)=>{
   const account= await Account.findOne({
    userId:req.userId
   })
   res.json({
    balance:account.balance
   })
})

router.post("/transfer", authMiddleware, async (req, res) => {
    const { amount, to } = req.body;

    const account = await Account.findOne({ userId: req.userId });

    if (!account || account.balance < amount) {
        return res.status(400).json({
            message: "Insufficient Balance"
        });
    }
    if( amount<0){
        return res.status(400).json({
            message: "invalid input"
        });
    }

    const toAccount = await Account.findOne({ userId: to });
    if (!toAccount) {
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transaction
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } });
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } });

    res.json({
        message: "Transaction Complete"
    });
});

module.exports=router;