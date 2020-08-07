//引入express
const express = require("express");
const router = express.Router();
const path = require("path");
const formidable = require("formidable");
const fs = require('fs');

var form = new formidable.IncomingForm();

//处理来自页面的ajax请求。single文件上传
router.post('/', async (req, res, next) => {
   
    console.log("文件上传传输");

    var today = new Date();
    var folder = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    var dirname = path.join(__dirname.replace("route", 'public'), 'upload', folder);
    if (mkdirsSync(dirname, '0777')) {
        form.uploadDir = dirname;
        form.encoding = "utf-8";
        form.keepExtensions = true;//保存扩展名
        form.maxFontSize = 20 * 1024 * 1024; //20M 
        // console.log("form.uploadDir: ", dirname);

        form.parse(req, (err, fields, files) => {

            const filePath = files.upload.path;
            const fileName = filePath.match(/(upload_.*)$/g)[0];
            const newPath = filePath.replace(path.join(__dirname.replace("route", ""), 'public'), '');
            // console.log('fields:', fields);
            // console.log('files:', files);0000.。。。。。。。。。。。。。。。。
            console.log('fileName:', fileName);
            console.log('newPath:', newPath);


            if (err) {
                console.log("err....................");
                return next(err);
            }
            // Everything went fine
            res.status(200,{"Content-Type":"text/html;charset=UTF8"}).end(JSON.stringify({
                uploaded: true,
                url: newPath
            })) ;
           //不能用send!!!!!!
            // res.send({
            //     uploaded: true,
            //     url: newPath
            // })
        });

    } else
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