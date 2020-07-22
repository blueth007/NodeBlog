const { Article } = require("../../model/article");


module.exports = async (req, res, next) => {

    //req.params 返回{id:123}
    const id = req.query.id;
    console.log(id);
    await Article.findById(id).then(article => {
        console.log(typeof article);
         //res.send("请求路由附加参数:id " + JSON.stringify(req.query.id))

         res.render("home/pageOne", { article });
    }).catch(err => {
        console.log("ERR: ",err.message);
        return res.redirect("/home")
    })
    // res.send("请求路由附加参数:id " + JSON.stringify(req.query.id))

}