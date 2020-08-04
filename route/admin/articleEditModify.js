const { Article,Validate } = require("../../model/article");

module.exports = async (req, res,next) => {
    const params = JSON.parse(JSON.stringify(req.body));
    console.log(params)
    try {
         await Validate({
            title:params.title,
            author:params.author,
            content:params.content,
            dateTime:params.dateTime,
            publish:params.publish
        });
        // await schema.validateAsync(params);
    } catch (error) {
        // return res.redirect("/admin/article_edit?message=" + error.message).
        //通过中间件来处理错误信息
        return next(JSON.stringify({path:"/admin/article_edit",message:error.message,button:"修改",id:params.id}));
    }
    //禁止修改email 会造成unique冲突

    //不存在则证明数据库没有,
    //对密码加密操作
    //写入数据库
    let newarticle= await Article.updateOne({_id:params.id},{
        title:params.title,
        author:params.author,
        content:params.content,
        dateTime:params.dateTime,
        publish:params.publish
    });
    if(newarticle){
        res.redirect("/admin/article")
    }else res.redirect("/admin/article_edit")

}