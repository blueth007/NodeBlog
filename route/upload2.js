//引入express
const express = require("express");
const router = express.Router();
const path = require("path");
const formidable = require("formidable");
const fs = require('fs');
 
var form = new formidable.IncomingForm();

//处理来自页面的ajax请求。single文件上传
router.post('/imgs',async (req, res, next) => {
    //拼接文件上传后的网络路径
    //console.log({[req.file.originalname]:req.file.path});
    // var url = 'http://' + req.headers.host + '/upload/' + req.file.originalname;
    console.log("文件上传传输");

    var today = new Date();
    var folder = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    var dirname = path.join(__dirname.replace("route", 'public'), 'upload', folder);
    if (await mkdirsSync(dirname, '0777')) {
        form.uploadDir = dirname;
        form.encoding = "utf-8";
        form.keepExtensions = true;//保存扩展名
        form.maxFontSize = 20 * 1024 * 1024; //20M 
        // console.log("form.uploadDir: ", dirname);

        form.parse(req, (err, fields, files) => {
            // var fileName = new Date().getTime() + "." + files.upload.name.split('.')[files.upload.name.split('.').length - 1];
            // var newPath = path.join(form.uploadDir, fileName);
            const filePath = files.upload.path;
            const fileName = filePath.match(/(upload_.*)$/g)[0];
            const newPath = filePath.replace(path.join(__dirname.replace("route",""),'public'),'');
            console.log('fields:', fields);
            console.log('files:', files);
            console.log('fileName:', fileName);
            console.log('newPath:', newPath);


            if (err) {
                console.log(err);
                return next(err);
            }
            // Everything went fine
            res.status(200)
            res.send({
                uploaded: true,
                url:newPath
            })
        });

    }else
    console.error('error')


});

function mkdirsSync(dirpath, mode) {
    if (!fs.existsSync(dirpath)) {
        var pathtmp;
        dirpath.split(path.sep).forEach(function (dirname) {
            if (dirname == "") {
                dirname = "/"
            }
            if (pathtmp) {
                pathtmp = path.join(pathtmp, dirname);
            } else {
                pathtmp = dirname;
            }
            if (!fs.existsSync(pathtmp)) {
                if (!fs.mkdirSync(pathtmp, mode)) {
                    return false;
                }
            }
        });
    }
    return true;
}

module.exports = router;