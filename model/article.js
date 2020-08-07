const mongoose = require("mongoose");

const fs = require("fs");
const { promisify } = require("util")
//fs读取文件异步变同步函数
const fileRead = promisify(fs.readFile);


//Joi插件
const Joi = require('@hapi/joi');
//新建规则约束
const schema = Joi.object({
    title: Joi.string().min(3).max(100)
        .required().error(new Error("标题不符合规则")),

    author: Joi.string().required().min(2).max(15)
        .error(new Error("作者不符合规则")),
    cover: Joi.string().alphanum().error(new Error("封面不符合规则")),
    summary: Joi.string().error(new Error("摘要不符合规则")),
    //repeat_password: Joi.ref('password'),

    // access_token: [
    //     Joi.string(),
    //     Joi.number()
    // ],

    // birth_year: Joi.number()
    //     .integer()
    //     .min(1900)
    //     .max(2013),

    dateTime: Joi.string().required().error(new Error("发布时间不符合规则")),
    publish: Joi.boolean().error(new Error("发布与否不符合规则")),
    content: Joi.string().required().error(new Error("内容不符合规则"))
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
        required: true,
        default: 'admin'
    },
    cover: {
        type: String,
        default: "/images/bike.jpg"
    },
    summary: {
        type: String,
        default: "这是摘要部分内容"
    },
    content: {
        type: String,
    },
    dateTime: {
        type: String,
        default: new Date().toLocaleString()
    },
    publish: {
        type: Boolean,
        required: true,
        default: false
    }
})

//创建集合
const Article = mongoose.model("Article", articleSchema);
//测试新建用户
async function CreateArticle() {
    const article = await fileRead("./model/articlesArray.json", "utf8");
    const articles = JSON.parse(article)
    Article.create(articles).then(() => {
        console.log("创建成功");

    }).catch(() => {
        console.log("创建文章失败");

    })

}

// CreateArticle();

const Validate = article => {
    return schema.validateAsync(article);
}

//将用户集合作为模块成员导出
module.exports = {
    Article,
    Validate
}