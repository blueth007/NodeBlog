const mongoose = require("mongoose");

//Joi插件
const Joi = require('@hapi/joi');
//新建规则约束
const schema = Joi.object({
   
});


//创建用户集合规则
const authorSchema = new mongoose.Schema({
    author: {
        type:String,
        required:true,
        default:"admin"
    }
})

//创建集合
const Author = mongoose.model("Author", authorSchema);
//测试新建用户
async function CreateAuthor() {
    Author.create({
        author:"admin",
       
    }).then(() => {
        console.log("创建成功");

    }).catch(() => {
        console.log("创建用户失败");

    })

}
//CreateAuthor();
//http://rap2.taobao.org:38080/app/mock/232073/blog/users
// mongoimport --db blog --collection articles --jsonArray articel.json

const Validate =  user => {
   return  schema.validateAsync(user);
}

//将用户集合作为模块成员导出
module.exports = {
    Author,
    Validate
}