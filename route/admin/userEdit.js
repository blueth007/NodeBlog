const { User } = require("../../model/user")

module.exports = async (req, res, next) => {
    //console.log("user_edit");
    const { message, id } = req.query;
    if (id) {
        //修改操作
        let user = await User.findOne({ _id: id });
        res.render("admin/user-edit", {
            message,
            user,
            link:"/admin/user_modify", //其实是修改用户数据路由地址,
            button:"修改"
        })
    } else {
        //添加操作
        console.log(req.query);
        res.render("admin/user-edit", { 
            message ,
            link:"/admin/user_edit",
            button:"添加"
        })
    }

}