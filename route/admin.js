const express = require("express");
const { route } = require("./uploadImage");

const router = express.Router()
 

router.get("/login", (req, res) => {

    // res.send("This is post Admin Page 请求参数是" + JSON.stringify(req.body))
    res.render("admin/login");

})

router.post("/login",require("./admin/login"));//登陆处理

router.get("/article", require("./admin/articlePage"));//展示文章列表table
router.get("/article_edit",require("./admin/articleEdit"));//展示编辑文章
router.get("/article_delete",require("./admin/articleDelete"));//删除文章
router.post("/article_add",require("./admin/articleEditPostAdd"));//展示编辑文章
router.post("/article_modify",require("./admin/articleEditModify"));//修改编辑文章



router.get("/user", require("./admin/userPage"));//展示文章列表table
router.get("/user_edit", require("./admin/userEdit"));//展示用户列表table
router.get("/user_delete",require("./admin/userDelete"));//删除用户请求
router.post("/user_add", require("./admin/userEditPostAdd"));//添加用户post方式
router.post("/user_modify", require("./admin/userEditModify"));//修改post方式

router.get("/logout",require("./admin/logout"))

router.get("/images",require("./admin/images"));//图片管理
router.get("/images/delete",require("./admin/imagesDelete"));//图片管理

router.use("/",(req,res)=>{
    res.render("common/NotFound");
})
module.exports = router