const express = require("express");
const router = express.Router();
const url = require("url");
const path = require("path")
const fs = require("fs");
const formidable = require("formidable");
//引入multer
var multer=require("multer");

//设置文件上传路径和文件命名
var today = new Date();
var folder = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()+"/";
var storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function(req, file, cb) {
        cb(null, '/public/upload/')
    },
    //给上传文件重命名，获取添加后缀名
    filename: function(req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});

var fileFilter = function(req, file, cb) {
        cb(null, true);   //这里设置为false则直接拒绝上传了，实际使用应为true
    }
    //添加配置文件到muler对象。
var upload = multer({
    storage: storage,
    fileFilter: fileFilter
});


var up = upload.single('file');

router.post('/imgs', function(req, res, next) {
    // req.file 是 `avatar` 文件的信息\
    console.log("in.......");

    up(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            // 发生错误
            // console.log("Multer 错误");
            return next(err)
          } else if (err) {
            // 发生错误
            // console.log("其他 错误");
           return  next(err)
          }
          // Everything went fine
         res.send({
            uploaded:true,
            url:"https://p.ssl.qhimg.com/dmsmfl/120_75_/t01ef00c44310f01f2b.webp?size=761x400&phash=2075117201575372748"
         })
         
    })
});


module.exports = router;