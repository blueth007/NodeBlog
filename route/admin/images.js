const fs = require("fs");
var path = require('path');
 
 
 

//读取当前文件夹的列表目录.返回数组格式
function readFileListArr(dir, filesList = [],deep=false) {
  const files = fs.readdirSync(dir);
  // console.log(files);
  files.forEach((item, index) => {
    var fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()&&deep) {
      readFileListArr(path.join(dir, item), filesList); //递归读取文件
    } else {
      filesList.push(fullPath);
    }
  });
  return filesList;
}
var filesList = [];

//读取文件夹及子文件夹所有文件列表目录 +deep整合一起判断是否递归子目录 返回json格式
function readFileList(dir, deep = false) {
  const imagesArr = fs.readdirSync(dir);
  //console.log("目录1：",images);
  var temp = [];
  imagesArr.forEach((item, index) => {
    var fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory() && deep) {
      // console.log("目录2：",item)
      return temp.push({ [item]: readFileList(path.join(dir, item), deep) }) //递归读取文件}
    } else {
      temp.push(fullPath);
    }
  });


  return temp;
}

module.exports = (req, res) => {
  
  var fileLists =[];
  fileLists= readFileListArr("public/upload",fileLists, true);
  //const fileLists = readFileList("public/upload", true);
  const Lists = JSON.stringify(fileLists).replace(/public\\{1,2}/g, "/" )
 const imageLists = JSON.parse(Lists);
  //console.log("FILES:", imageLists)
  //res.send( imageLists);

  res.render("admin/imageLists", { imageLists })
}

