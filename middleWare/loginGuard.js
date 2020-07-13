//登陆拦截
 const guard = (req,res,next)=>{
        //1,判断访问的是否是登陆页面
        //2,判断用户是否已经登陆
        //   if已经登陆,放行next();
        //    else 重定向到登陆页面
        if(req.url!='/login'&& ! req.session.username){
            res.redirect("/admin/login");
        }else next(); //放行登陆
    }

    module.exports=guard;