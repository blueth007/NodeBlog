const {Article} = require("../../model/article");
const {User} =require("../../model/user")
module.exports= async (req, res, next) => {

   let notice=req.query.message ;
   //分页显示
   let page= req.query.page ||1; //当前页
   let count_article = await Article.countDocuments({});//查询articel的总数量
   let count_user = await User.countDocuments({});//查询user的总数量
   let pageSize=10; //默认每页显示数量
   let totalPage= Math.ceil(count_article/pageSize);//总的页数
   let start =(page-1)*pageSize; //页码对应开始位置
   let articles= await Article.find({}).sort({_id:-1}).skip(start).limit(pageSize);

   //渲染到article列表中
   res.render("admin/article",{articles,count_article,page,totalPage,count_user,notice})
   
}