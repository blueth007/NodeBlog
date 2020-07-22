const fs = require("fs");
var path = require('path');

module.exports = async (req, res,next) => {

    const { url } = req.query;
    const fileUrl = path.join(process.cwd(), "public", url)
    //console.log(fileUrl);
    new Promise((resolve, reject) => {
        fs.unlink(fileUrl, (err, data) => {
            if (err) {
                console.log("err:", err)
                reject(err);
                next(err)
            } else { 
              //  console.log(data); 
                resolve(data) }
        });
    })




    res.redirect("/admin/images");
}