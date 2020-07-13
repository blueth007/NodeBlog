const mongoose =require("mongoose");
//创建用户集合规则
const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlength:2,
        maxlength:20,
    },
    email:{
        type:String,
        //保证邮箱地址插入数据库不重复， 唯一值
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,   //角色， admin user有用户
        required:true,
    },
    state:{
        type:Number, //1 没有启用 0， 启动状态
        default:0
    }
})

//创建集合
const User = mongoose.model("User",userSchema);
//测试新建用户
async function CreateUser(){
    User.create({
        username:'admin',
        email:"admin@123.com",
        password:"123",
        role:"admin",
        state:0,
    }).then(()=>{
        console.log("创建成功");
        
    }).catch(()=>{
        console.log("创建用户失败");
        
    })
    
}
//CreateUser();

//将用户集合作为模块成员导出
module.exports ={
    User
}