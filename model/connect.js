//链接数据库
const mongoose =require("mongoose");

mongoose.connect('mongodb://localhost/blog',{useNewUrlParser: true})
    .then(()=>{
        console.log("数据库连接成功")
    })
    .catch(()=>{
        console.log("连接失败")
    })