const express = require("express");
const router=express.Router();
const url=require("url");
const path= require("path")

router.use("/imgs",(req,res)=>{
    console.log(req);
    
    res.send({
        uploaded:true,
        url:'upload/',
    })
})


module.exports=router;