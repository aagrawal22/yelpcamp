
var express=require("express");
var router=express.Router({mergeParams:true});
var Camp=require("../models/campgrounds");
var Comment=require("../models/comments");
var middleware=require("../middleware")//since name of file in this directory is index.js and by default first index,js is searched in any directory
                                       //So no need of ../middleware/index
//===================
//COMMENTS ROUTES
//===================
//------------------------------------------------------------------------NEW Route
router.get("/new",middleware.isLoggedIn,function(req,res){

 Camp.findById(req.params.id,function(err,tocomment){
  if(err){
    console.log(err)
       req.flash("error","Something went wrong");
    res.redirect("/campgrounds/"+req.params.id);
  }else{
    res.render("comments/new",{tocomment:tocomment})
  }

})


});
//-------------------------------------------------------------------CREATE Route
router.post("/",middleware.isLoggedIn,function(req,res){

 Camp.findById(req.params.id,function(err,foundpost){
   if(err){
       req.flash("error","Something went wrong");
    console.log(err)

  }
  else{
    Comment.create(req.body.comment,function(err,comment){

      if(err){
           req.flash("error",err.message);
        console.log(err)
      }else{
      	
      	var author={
      		id:req.user._id,
      		username:req.user.username
      	}
      	comment.author=author;
      	comment.save();
        foundpost.comments.push(comment);
        foundpost.save();
           req.flash("success","New Comment added successfully!!");
        res.redirect("/campgrounds/"+ foundpost._id);

      }
    })
  }
})
});
//Render edit comment form-----------------------------------------------EDIT ROute
router.get("/:commentid/edit",middleware.checkCommentOwnership,function(req,res){
  Comment.findById(req.params.commentid,function(err,commenttoupdate){
    if(err){
         req.flash("error","Something went wrong");
      res.redirect("back")
    }else{
       res.render("comments/edit",{commenttoupdate:commenttoupdate,campgroundid:req.params.id});
    }
  })
  


});
//----------------------------------------------------------------------------UPDATE Route
router.put("/:commentid",middleware.checkCommentOwnership,function(req,res){
   Comment.findByIdAndUpdate(req.params.commentid,req.body.comment,function(err,updatedcomment){

    if(err){
            req.flash("error","Something went wrong");
      res.redirect("back");
    }else{
         req.flash("success","Comment updated successfully!!");
      res.redirect("/campgrounds/"+req.params.id);
    }
   })


});
//----------------------------------------------------------------DELETE Route
router.delete("/:commentid",middleware.checkCommentOwnership,function(req,res){

    Comment.findByIdAndRemove(req.params.commentid,function(err){
      if(err){
           req.flash("error","Something went wrong");
        res.redirect("back");
      }else{
           req.flash("success","Comment deleted successfully!!");
        res.redirect("/campgrounds/"+req.params.id);
      }
    })


});



module.exports=router;