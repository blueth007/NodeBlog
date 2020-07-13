const express = require("express");
const { User } = require("../model/user");
const router = express.Router()


router.get("/login", (req, res) => {

    // res.send("This is post Admin Page 请求参数是" + JSON.stringify(req.body))
    res.render("admin/login");

})

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const result = await User.findOne({ username });
    //console.log("login:",req.body,result);
    if (result) {

        if (result.password == password) {
            // res.send("Login");
            res.redirect("/admin/article")

        } else {
            res.render("common/error")
        }
    } else {
        res.render("common/error")
    }

})

router.get("/article_edit", (req, res, next) => {
    console.log("article_edit");

    res.render("admin/article-edit")
})
router.get("/article", (req, res, next) => {

    res.render("admin/article", req.body)

})
module.exports = router