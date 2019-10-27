var express               = require("express"),
    app                   = express(),
    bodyParser            = require("body-parser"),
    mongoose              = require("mongoose"),
	passport              = require("passport"),
	LocalStrategy         = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose"),
    Campground            = require("./models/campground"),
	User                  = require("./models/user"),
    seedDB                = require("./seeds"),
    Comment               = require("./models/comment");    
       
mongoose.connect("mongodb://localhost/yelp_camp_v6", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

seedDB(); 
app.use(express.static(__dirname + '/public'));

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



app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

app.get("/", function (req, res) {
    // body...
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {
    // body...
    Campground.find({}, function (err, allCampgrounds) {
        // body...
        if(err) {
            console.log(err);
        } else {
            // console.log("");
            // console.log(campgrounds);
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

app.get("/campgrounds/new", function(req, res) {
    //body...
   res.render("campgrounds/new"); 
});

app.get("/campgrounds/:id", function(req, res) {
    // body...
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        // body...
        if (err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

app.post("/campgrounds", function(req, res){
    //body...
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
    // Create a new campground and save it to DB
    Campground.create(newCampground, function (err, newlyCreated) {
        // body...
        if (err) {
            console.log(err);
            
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// =========================
// COMMENTS ROUTES
// =========================

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		}
		else{
			res.render("comments/new", {campground: campground})
		}
	});
});

app.post("/campgrounds/:id/comments",isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else{
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				} else{
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});

//============
//AUTH ROUTES
//============

app.get("/register", function(req, res){
	res.render("register");
});

app.post("/register", function(req, res){
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/campgrounds");
		});
	});
});

app.get("/login", function(req, res){
	res.render("login");
});

app.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}), function(req, res){
});

app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}
 
app.listen(3000, function(){
   console.log("The YelpCamp Server Has Started!") 
});