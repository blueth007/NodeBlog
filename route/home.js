const express = require("express")
const home =express.Router();//创建路由对象
//引入body-parser解析post参数
 
require("./util");

//在hone下创建二级路由
home.get("/", require("./home/list"));//展示home下的所有文章


// home.get("/index",(req,res)=>{
//     // http::1/home/index?name=zhangshan&sex=man
//     //req.query是get请求的参数 {name:zhangsan,sex:man}
//     res.send("请求使用了router路由,地址是/home/index"+JSON.stringify(req.query))
// })

//请求路由参数  http:localhost:3000/home/index/123
home.get("/page",require("./home/pageDetail")); //展示详细文章信息


module.exports=home