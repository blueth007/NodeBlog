const { Article } = require("../../model/article")

module.exports = async (req, res, next) => {
    const { id } = req.query;


    if (id) {
        //修改操作
        let article
        try {
            article = await Article.findOne({ _id: id });
        } catch (error) {
            return next(JSON.stringify({ path: "/admin/article", message: "没有找到对应ID的文章", id }));
        }
        await Article.findByIdAndDelete(id).then(() => {
            res.redirect("/admin/article")
        }).catch(err => {
            return next(JSON.stringify({ path: "/admin/article", message: "发送删除命令失败:" + err.message, id }));
        })

    } else res.redirect("/admin/article")
}