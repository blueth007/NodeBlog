 

const { Article } = require("../../model/article")

module.exports = async (req, res, next) => {
    //console.log("user_edit");
    const { message, id } = req.query;
   
    if (id ) {
        //修改操作
        let article
       try{
          article  = await Article.findOne({ _id: id });
       }catch(error){
            return next(JSON.stringify({path:"/admin/article",message:"没有找到对应ID的文章",id}));
       }
    //    console.log(article)
        res.render("admin/article-edit", {
            message,
            article,
            link:"/admin/article_modify", //其实是修改用户数据路由地址,
            button:"修改"
        })
    } else {
        //添加操作
        // console.log(req.query);
        let article=req.query.article?JSON.parse(req.query.user):null;
        res.render("admin/article-edit", { 
            message ,
            article,
            link:"/admin/article_add",
            button:"添加"
        })
    }

}