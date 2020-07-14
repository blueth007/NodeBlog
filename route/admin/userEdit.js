module.exports= (req, res, next) => {
    //console.log("user_edit");
    const errMsg=req.query.message;
    res.render("admin/user-edit",{errMsg})
}