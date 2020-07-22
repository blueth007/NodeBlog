const { Article } = require("../../model/article");

module.exports = async (req, res, next) => {

    await Article.find({}).then((articles) => {
        console.log("获取article成功");
        res.render("home/index", { articles })
    }).catch(error => {
        console.log(error);
    })

}