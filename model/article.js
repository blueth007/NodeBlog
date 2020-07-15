const mongoose = require("mongoose");

//Joi插件
const Joi = require('@hapi/joi');
//新建规则约束
const schema = Joi.object({
    title: Joi.string()
        .alphanum().min(3).max(100)
        .required().error(new Error("标题不符合规则")),

    author: Joi.string().required().min(2).max(15)
        .error(new Error("作者不符合规则")),

    //repeat_password: Joi.ref('password'),

    // access_token: [
    //     Joi.string(),
    //     Joi.number()
    // ],

    // birth_year: Joi.number()
    //     .integer()
    //     .min(1900)
    //     .max(2013),

    dateTime: Joi.string().required().error(new Error("时间不符合规则")),
    publish: Joi.boolean().error(new Error("发布词条不符合规则")),
    content: Joi.string().required().error(new Error("状态不符合规则"))
});


//创建用户集合规则
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100
    },
    author: {
        type: String,
        //保证邮箱地址插入数据库不重复， 唯一值
        // unique: true,
        required: true,
        default: 'admin'
    },
    content: {
        type: String,
    },
    dateTime: {
        type: String,
        default: new Date().toLocaleString()
    },
    publish: {
        type: Boolean, //1 没有启用 0， 启动状态
        default: false
    }
})

//创建集合
const Article = mongoose.model("Article", articleSchema);
//测试新建用户
async function CreateArticle() {
    Article.create({
        title: "Hight Telphone come soon",
        author: "admin",
        content: "<p>hasdqerdfsdfasf<span>asdqsdgsdlkj</span></p>",
        dateTime: '2020-6-23',
        publish: true
    }).then(() => {
        console.log("创建成功");

    }).catch(() => {
        console.log("创建文章失败");

    })

}
//CreateArticle();
//http://rap2.taobao.org:38080/app/mock/232073/blog/article
const Validate = article => {
    return schema.validateAsync(article);
}

//将用户集合作为模块成员导出
module.exports = {
    Article,
    Validate
}