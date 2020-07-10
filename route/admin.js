const express = require("express");
const e = require("express");
const router = express.Router()

router.use("/", (req, res,next) => {
    console.log(req.body)
    //res.render("admin/login",req.body)
    const obj = req.body;
    if (JSON.stringify(obj) == "{}"||obj.username ==undefined ||obj.username=="") {
        res.render("admin/login", req.body)
    }else{
        res.render("admin/article",req.body)
    }

})

router.use("/login", (req, res) => {
    console.log("/login: ", req.body)
    // res.send("This is post Admin Page 请求参数是" + JSON.stringify(req.body))
    res.render("admin/login", req.body)
})
module.exports = router