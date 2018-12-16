var express=require("express");
var router=express.Router({mergeParams:true});
var Camp=require("../models/campgrounds");
var middleware=require("../middleware")//since name of file in this directory is index.js and by default first index,js is searched in any directory
                                       //So no need of ../middleware/index

//========================================================
//Campgrounds Routes
//========================================================
router.get("/",function(req,res){
 Camp.find({},function(err,allcamps){
   if(err){
    console.log(err);
  }else{
    res.render("campgrounds/campgrounds",{camps:allcamps});
  }


})

});
//---------------------------------------------------------------------NEW ROUTE
router.get("/new",middleware.isLoggedIn,function(req,res){

  res.render("campgrounds/new");

});
//---------------------------------------------------------------------CREATE ROUTE
router.post("/",middleware.isLoggedIn,function(req,res){
	var name=req.body.name;
	var img=req.body.img;
  var description=req.body.description;
  var author={
  	id:req.user._id,
  	username:req.user.username
  }
  var newcamp={name:name,img:img,description:description,author:author};
  Camp.create(newcamp,function(err,newlycamp){
   if(err){
    req.flash("error",err.message);
    console.log(err);
  }else{
    req.flash("success","Campground created successfully");
    res.redirect("/campgrounds");
  }

})

});

//Route to show description about a camp grnd---------------------------SHOW Route
router.get("/:id",function(req,res){

  Camp.findById(req.params.id).populate("comments").exec(function(err,foundcamp){
    if(err){
      req.flash("error","Something went wrong");
      console.log("Something went wrong");
    }else{
      res.render("campgrounds/showdesc",{foundcamp:foundcamp});

    }
  })
});

//Route to render edit form-------------------------------------------EDIT route
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
  Camp.findById(req.params.id,function(err,foundcamp){
     if(err){
      req.flash("error","Something went wrong");
      res.redirect("/campgrounds")
     }else{
      res.render("campgrounds/edit",{foundcamp:foundcamp});
     }

  })
});
//Route to update---------------------------------------------UPDATE Route
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
 Camp.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedcamp){
  if(err){
    req.flash("error",err.message);
    res.redirect("/campgrounds");
  }else{
    req.flash("success","Campground Updated Successfully!!");
    res.redirect("/campgrounds/"+req.params.id)
  }
 })


});
//Route to delete----------------------------------------------DELETE Route
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){

  Camp.findByIdAndRemove(req.params.id,function(err){
    if(err){
         req.flash("error","Something went wrong");
    res.redirect("/campgrounds/"+req.params.id);
    }else{
         req.flash("success","Campground deleted successfully");
    res.redirect("/campgrounds")
    }
  })
})

module.exports=router;