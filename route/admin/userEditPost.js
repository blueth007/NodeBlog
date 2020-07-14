const { User,Validate } = require("../../model/user");





module.exports = async (req, res,next) => {
    const params = JSON.parse(JSON.stringify(req.body));

    try {
        Validate(params);

    } catch (error) {
        // return res.redirect("/admin/user_edit?message=" + error.message).
        //通过中间件来处理错误信息
        return next(JSON.stringify({path:"/admin/user_edit",message:error.message}))
    }

    //检查新增用户是否存在
    let user = await User.findOne({ email: params.email });
    if (user) { //user 存在证明新增的用户已存在
        //重定向错误处理
        //return res.redirect("/admin/user_edit?message=新增用户的邮箱已经存在!")
        return next(JSON.stringify({path:"/admin/user_edit",message:'新增用户的邮箱已经存在!'}))
    }
    //不存在则证明数据库没有,
    //对密码加密操作
    //写入数据库
    let newUser= await User.create(params);
    if(newUser){
        res.redirect("/admin/user")
    }else res.redirect("/admin/user_edit")


}
