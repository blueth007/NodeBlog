const { User } = require("../../model/user");
//加密另写
//加密
const { v5, validate } = require("uuid")

const PostLogin = async (req, res) => {
    const { username, password, remember } = req.body;

    if (username.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).render("common/error");
    }
    const result = await User.findOne({ username });
    // console.log("login:",req.body,result);
    if (result) {

        if (validate(password)&&result.password == password || result.password == v5(password, v5.URL)) {
            // res.send("Login");

            //将username 存在session中
            req.session.username = result.username;
            //或者将这个user变量暴露给全局变量 ,req.app就是在app.js中的app服务
            res.app.locals.userInfo = result;
            res.cookie("username", username)
            if (remember == 'on') {
                res.cookie("remember", 'on')
                res.cookie("username", username)
                res.cookie("password", result.password)
            }else{ 
               res.clearCookie("password")
            }
            res.redirect("/admin/article")
            // res.redirect("/admin/user")

        } else {

            res.render("common/error")
        }
    } else {

        res.render("common/error")
    }

};

module.exports = PostLogin;