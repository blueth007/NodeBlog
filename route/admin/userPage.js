const {User} =require("../../model/user")
const {Article} = require("../../model/article");

 module.exports = async(req, res) => {
  //读取数据库内容 
   // const users=await User.find({});
   // console.log(users);

   //分页显示
   let page= req.query.page ||1; //当前页
   let count_user = await User.countDocuments({});//查询user的总数量
   let count_article = await Article.countDocuments({});//查询articel的总数量

   let pageSize=10; //默认每页显示数量
   let totalPage= Math.ceil(count_user/pageSize);//总的页数
   let start =(page-1)*pageSize; //页码对应开始位置
   let users= await User.find({}).skip(start).limit(pageSize);

   //渲染到user列表中
   res.render("admin/user",{users,count_user,page,totalPage,count_article})
  
}

