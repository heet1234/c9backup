var express               = require("express"),
    app                   = express(),
    bodyParser            = require("body-parser"),
    mongoose              = require("mongoose"),
	flash                 = require("connect-flash"),
	passport              = require("passport"),
	LocalStrategy         = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose"),
	methodOverride        = require("method-override"),
    Campground            = require("./models/campground"),
	User                  = require("./models/user"),
    seedDB                = require("./seeds"),
    Comment               = require("./models/comment");

var campgroundRoutes      = require("./routes/campgrounds"),
	commentRoutes         = require("./routes/comments"),
	indexRoutes            = require("./routes/index");
       
mongoose.connect("mongodb://localhost/yelp_camp_v10", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//seedDB(); 
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));
app.use(flash());

app.use(require("express-session")({
	secret: "I just love my best friends",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

 
app.listen(3000, function(){
   console.log("The YelpCamp Server Has Started!") 
});

// Campground.create(
//     {
//         name: "Granite Hill", 
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXkO0GHF94MyNe3odI73WuPVoVDFgYwK7mh0LUH023OsbPgzQP",
//         description: "This is a huge granite hill, no bathroom. No water. Beautiful granite."
//     }, function (err, campground) {
//         // body...
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("NEWLY CREATED CAMPGROUND: ");
//             console.log(campground);
//         }
//     });