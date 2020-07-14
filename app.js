const express = require("express")
const app = express();
const path =require("path");
const home = require("./route/home");//引用home路由模块
const admin = require("./route/admin");//引用admin路由模块
const upload = require("./route/upload");//引用upfile路由模块
//引入body-parser解析post参数
const bodyParser =require("body-parser");
//引入session来判断用户是否正常连接
const session = require("express-session");

//连接数据库
require("./model/connect");
require("./model/user");


//告诉express框架魔板所在位置 
app.set("views",path.join(__dirname,"views"));
//设置默认后缀.art
app.set("view engine","art");
//渲染后缀为art魔板,所使用魔板引擎 express-art-template
app.engine("art",require("express-art-template"));

const fs = require("fs");
const { promisify } = require("util")
const fileRead = promisify(fs.readFile);

//配置body-parser模块
app.use(bodyParser.urlencoded({extended:false}));
//extended: false 方法内部使用querystring模块处理请求参数的格式
//extended: true 方法内部使用第三方模块qs处理参数请求的格式

//实现静态资源访问功能
app.use(express.static(path.join(__dirname,"public")))
//拦截所有请求 识别session
app.use(session({secret:"secret key"}));

//拦截登陆页面,判断用户是否登陆
// app.use("/admin",(req,res,next)=>{
//     //1,判断访问的是否是登陆页面
//     //2,判断用户是否已经登陆
//     //   if已经登陆,放行next();
//     //    else 重定向到登陆页面
//     if(req.url!='/login'&& ! req.session.username){
//         res.redirect("/admin/login");
//     }else next(); //放行登陆
// })
/**使用中间件 middleWare拦截 */
app.use("/admin",require("./middleWare/loginGuard"))

//将路由和请求对象进行匹配
app.use("/home",home);
app.use("/admin",admin);
app.use("/upload",upload);

app.get("/", async (req, res, next) => {
    const Ip = req.ip//获取主机名和IP地址
    var text = "your ip is " + Ip + " your method is " + req.method;
    //异步读取文件并捕获错误发送
    let r1 = await fileRead("./public/default.html", "utf8").then(data => res.send(data)).catch(err => next(err));
    // res.send(text);
})
app.post("/", (req, res, next) => {
    const Ip = req.ip//获取主机名和IP地址
    var text = "your ip is " + Ip + " your method is " + req.method;
    res.send(text);
})

//错误解析处理
app.use((err, req, res, next) => {
    //错误处理只能处理同步
    const result=JSON.parse(err);
    res.redirect(`${result.path}?message=${result.message}`)
    //res.status(500).send(err.message);
})

app.listen(3000);
console.log("服务器已启动.....")