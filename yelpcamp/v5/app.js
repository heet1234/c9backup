var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds"),
    Comment     = require("./models/comment");    
       
mongoose.connect("mongodb://localhost/yelp_camp_v3", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

seedDB(); 
app.use(express.static(__dirname + '/public'));


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

app.get("/campgrounds/:id/comments/new", function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		}
		else{
			res.render("comments/new", {campground: campground})
		}
	});
});

app.post("/campgrounds/:id/comments", function(req, res){
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
 
app.listen(3000, function(){
   console.log("The YelpCamp Server Has Started!") 
});