const { User,Validate } = require("../../model/user");

module.exports = async (req, res,next) => {
    const params = JSON.parse(JSON.stringify(req.body));
    
    try {
         await Validate({
            username:params.username,
            password:params.password,
            email:params.email,
            role:params.role,
            state:params.state
        });
        // await schema.validateAsync(params);
    } catch (error) {
        // return res.redirect("/admin/user_edit?message=" + error.message).
        //通过中间件来处理错误信息
        return next(JSON.stringify({path:"/admin/user_edit",message:error.message,button:"修改",id:params.id}));
    }
    //禁止修改email 会造成unique冲突

    //不存在则证明数据库没有,
    //对密码加密操作
    //写入数据库
    let newUser= await User.updateOne({_id:params.id},{
        username:params.username,
        password:params.password,
        role:params.role,
        state:params.state
    });
    if(newUser){
        res.redirect("/admin/user")
    }else res.redirect("/admin/user_edit")

}