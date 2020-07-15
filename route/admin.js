const express = require("express");

const router = express.Router()
 

router.get("/login", (req, res) => {

    // res.send("This is post Admin Page 请求参数是" + JSON.stringify(req.body))
    res.render("admin/login");

})

router.post("/login",require("./admin/login"));//登陆处理

router.get("/article_edit",require("./admin/articleEdit"));//展示编辑文章
router.get("/article", require("./admin/articlePage"));//展示文章列表table
router.use("/user", require("./admin/userPage"));//展示文章列表table
router.get("/user_edit", require("./admin/userEdit"));//展示用户列表table
router.post("/user_edit", require("./admin/userEditPost"));//添加用户post方式
router.post("/user_modify", require("./admin/userEditModify"));//添加用户post方式

router.get("/logout",require("./admin/logout"))
module.exports = router