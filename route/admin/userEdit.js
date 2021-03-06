const { User } = require("../../model/user")

module.exports = async (req, res, next) => {
    //console.log("user_edit");
    const { message, id } = req.query;
   
    if (id ) {
        //修改操作
        let user;
        try{
            user  = await User.findOne({ _id: id });
         }catch(error){
              return next(JSON.stringify({path:"/admin/user",message:"没有找到对应ID的用户",id}));
         }
       
        res.render("admin/user-edit", {
            message,
            user,
            link:"/admin/user_modify", //其实是修改用户数据路由地址,
            button:"修改"
        })
    } else {
        //添加操作
        // console.log(req.query);
        let user=req.query.user?JSON.parse(req.query.user):null;
        res.render("admin/user-edit", { 
            message ,
            user,
            link:"/admin/user_add",
            button:"添加"
        })
    }

}