var express                       =require("express"),
    bodyParser                    =require("body-parser"),
    mongoose                      =require("mongoose"),
    methodOverride                =require("method-override"),
    flash                         =require("connect-flash"),
    passport                      =require("passport"),
    LocalStrategy                 =require("passport-local"),
    passportLocalMongoose         =require("passport-local-mongoose"),
    campgroundsroute              =require("./routes/campgrounds"),//route file
    commentsroute                 =require("./routes/comments"),//route file
    authenticationroute           =require("./routes/index"),//route file
    User                          =require("./models/user"),
    Camp                          =require("./models/campgrounds"),
    Comment                       =require("./models/comments"),
    seedDB                        =require("./models/seeds");


 mongoose.connect("mongodb://localhost/yelp_camp_v5");//creating a db named yelp_camp   
 var app=express();

 app.use(require("express-session")({
   secret:"Stay Original",
   resave:false,
   saveUninitialized:false

 }));
 app.use(flash());
//Configure passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: true}));
/*seedDB();*/  //to seed the data
 app.use(methodOverride("_method"));
app.use(function(req,res,next){

res.locals.currentUser=req.user;//req.user will give information about current user to currentUser if user is loged in and undefined if logged out
                                //if logout currrentUser=undefined else currentUser={username:someusername,_id:someid}
 res.locals.error=req.flash("error");
 res.locals.success=req.flash("success");                           
next();                         
});//This is midware which will run on every route and currentUser will be passed as an argument in every render 


//=============
//ROUTES
//=============
app.use(authenticationroute);
app.use("/campgrounds",campgroundsroute);
app.use("/campgrounds/:id/comments",commentsroute);




app.listen(3000,function(){
  console.log("Yelpcamp v2 Server started");

});