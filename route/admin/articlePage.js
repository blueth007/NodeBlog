const {Article} = require("../../model/article");
module.exports= async (req, res, next) => {

     

   //分页显示
   let page= req.query.page ||1; //当前页
   let count = await Article.countDocuments({});//查询到的总数量
   let pageSize=10; //默认每页显示数量
   let totalPage= Math.ceil(count/pageSize);//总的页数
   let start =(page-1)*pageSize; //页码对应开始位置
   let articles= await Article.find({}).skip(start).limit(pageSize);

   //渲染到user列表中
   res.render("admin/article",{articles,count,page,totalPage})
   
}