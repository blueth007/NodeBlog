//链接数据库
const mongoose =require("mongoose");
 

 mongoose.connect("mongodb://myblog:myblog%23123@localhost/blog?authSource=blog",{useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true})
    .then(()=>{
        console.log("数据库连接成功")
    })
    .catch(()=>{
        console.log("连接失败")
    })
    