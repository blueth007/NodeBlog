const mongoose = require("mongoose");
//Joi插件
const Joi = require('@hapi/joi');
//新建规则约束
const schema = Joi.object({
    username: Joi.string()
        .alphanum().min(3).max(12)
        .required().error(new Error("用户名不符合规则")),

    password: Joi.string().required()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,18}$')).error(new Error("密码不符合规则")),

    //repeat_password: Joi.ref('password'),

    // access_token: [
    //     Joi.string(),
    //     Joi.number()
    // ],

    // birth_year: Joi.number()
    //     .integer()
    //     .min(1900)
    //     .max(2013),

    email: Joi.string().required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'cc', 'cn'] } }).error(new Error("邮箱不符合规则")),
    role: Joi.string().valid('normal', 'admin').error(new Error("角色不符合规则")),
    state: Joi.number().valid(0, 1).error(new Error("状态不符合规则"))
});


//创建用户集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
    },
    email: {
        type: String,
        //保证邮箱地址插入数据库不重复， 唯一值
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,   //角色， admin user有用户
        required: true,
    },
    state: {
        type: Number, //1 没有启用 0， 启动状态
        default: 0
    }
})

//创建集合
const User = mongoose.model("User", userSchema);
//测试新建用户
async function CreateUser() {
    User.create({
        username: 'admin',
        email: "admin@123.com",
        password: "123",
        role: "admin",
        state: 0,
    }).then(() => {
        console.log("创建成功");

    }).catch(() => {
        console.log("创建用户失败");

    })

}
//CreateUser();

const Validate = async user => {
    return await schema.validateAsync(user);
}

//将用户集合作为模块成员导出
module.exports = {
    User,
    Validate
}