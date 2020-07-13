const express = require("express");
 
const router = express.Router()



router.get("/login", (req, res) => {
  
    // res.send("This is post Admin Page 请求参数是" + JSON.stringify(req.body))
    res.render("admin/login")
})

router.post("/login",(req,res)=>{

})
router.get("/article_edit",(req,res,next)=>{
    console.log("article_edit");
    
    res.render("admin/article-edit")
})
router.use("/", (req, res,next) => {
    console.log(req.body)
    //res.render("admin/login",req.body)
    // const obj = req.body;
    // if (JSON.stringify(obj) == "{}"||obj.username ==undefined ||obj.username=="") {
    //    // res.render("admin/login", req.body)
    //   res.redirect('/login');
    //   next();
    // }else{
        res.render("admin/article",req.body)
    // }

})
module.exports = router