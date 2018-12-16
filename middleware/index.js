var middlewareObj={};
var Camp=require("../models/campgrounds");
var Comment=require("../models/comments");
//=========================
//Check login
 middlewareObj.isLoggedIn =function(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }else{
    req.flash("error","You need to be logged in!!")
    res.redirect("/login");
  }
};
//===================================
//Campground Ownership

 middlewareObj.checkCampgroundOwnership=function(req,res,next){
if(req.isAuthenticated()){
  Camp.findById(req.params.id,function(err,foundcamp){
    if(err){
        req.flash("error","Campground not found")
      res.redirect("back")
    }else{
      if(foundcamp.author.id.equals(req.user._id)){
        next();
      }
      else{
          req.flash("error","Only the creater of this campground can access this")
         res.redirect("back")
      }
    }
  })
}
else{
    req.flash("error","You need to be logged in!!")
  res.redirect("back")
}

};
//====================================
//Comment Ownership
 middlewareObj.checkCommentOwnership=function(req,res,next){
  if(req.isAuthenticated()){
    Comment.findById(req.params.commentid,function(err,foundcomment){
      if(err){
          req.flash("error","Comment not found")
        res.redirect("back")
      }else{
         if(foundcomment.author.id.equals(req.user._id)){
          next();
         }else{
          req.flash("error","Only the creater of this comment can access this")
          res.redirect("back");
         }
      }
    })
  }
  else{
      req.flash("error","You need to be logged in!!")
    res.redirect("back")
  }
};
module.exports=middlewareObj;