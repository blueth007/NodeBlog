const fs = require("fs");
var path = require('path');
const express =require("express");
const files =express.Router();


//读取当前文件夹的列表目录，不进行子文件夹遍历
 function readCurrentFiles(dir, filesList = []) {
  const files = fs.readdirSync(dir)
  files.forEach(function (item, index) {
    let stat = fs.lstatSync(path.join(dir, item))
    if (stat.isDirectory() === true) {
      filesList.push(item)
    }
  })
  return filesList;
}


//读取文件夹及子文件夹所有文件列表目录 +deep整合一起判断是否递归子目录
function readFileList(dir, deep = false) {
  const files = fs.readdirSync(dir);
  //console.log("目录1：",files);
  var temp=[];
  files.forEach((item, index) => {
    var fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);    
    if (stat.isDirectory() && deep) {
      // console.log("目录2：",item)
      return temp.push( {[item]: readFileList(path.join(dir, item),  deep) }) //递归读取文件}
    } else {
      temp.push(fullPath);
    }
  });
 

  return temp;
}

files.get("/",(req,res)=>{
  //readCurrentFiles("public/upload", filesList);
const fileLists = readFileList("public/upload", true);
 console.log(fileLists);
res.send(JSON.stringify(fileLists).replace(/public\\{1,2}/g,""));
})

module.exports = files;