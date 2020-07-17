const { User } = require("../../model/user")

module.exports = async (req, res, next) => {
    const { id } = req.query;


    if (id) {
        //修改操作
     
        await User.findByIdAndDelete(id).then(() => {
            res.redirect("/admin/user")
        }).catch(err => {
            return next(JSON.stringify({ path: "/admin/user", message: "发送删除命令失败:" + err.message, id }));
        })

    } else res.redirect("/admin/user")
}