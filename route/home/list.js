const { Article } = require("../../model/user");

module.exports = async (req, res, next) => {

    let artilces = await Article.find({}).then(() => {
        console.log("获取article成功")
    }).catch(error => {
        console.log(error);
    })

    res.render("home/index", { artilces })
}