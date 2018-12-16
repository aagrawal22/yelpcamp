
var express=require("express");
var router=express.Router({mergeParams:true});
var passport=require("passport");
var User=require("../models/user");



router.get("/",function(req,res){

  res.render("landing");
});



//=====================
//AUTHENTICATION Routes
//======================
//rendering register form
router.get("/register",function(req,res){
  res.render("register");
});
//Registering a user
router.post("/register",function(req,res){
    var newUser=new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
    if(err){
      req.flash("error",err.message);
      console.log(err);
      return res.render("register")
    }
    passport.authenticate("local")(req,res,function(err,newuser){
      req.flash("success","Welcome to YelpCamp"+newuser.username);
      res.redirect("/campgrounds");
    })
    });



});
//Render login form
router.get("/login",function(req,res){
   res.render("login")
});
//Check details and login
router.post("/login",passport.authenticate("local",{
     
   successRedirect:"/campgrounds",
 
   failureRedirect:"/login"


}),function(req,res){
});

router.get("/logout",function(req,res){

  req.logout();
     req.flash("success","Successfully logged out!!");
  res.redirect("/campgrounds");
});


module.exports=router;