var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

router.get("/", function (req, res) {
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

router.get("/new", middleware.isLoggedIn, function(req, res) {
    //body...
   res.render("campgrounds/new"); 
});

router.get("/:id", function(req, res) {
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

router.post("/", middleware.isLoggedIn, function(req, res){
    //body...
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
    var newCampground = {name: name, image: image, description: description, author: author};
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

router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		res.render("campgrounds/edit", {campground: foundCampground});

	});
});

router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err) {
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err, campgroundRemoved){
		if(err) {
			res.redirect("/campgrounds");
		} 
		Comment.deleteMany( {_id: { $in: campgroundRemoved.comments } }, function(err){
			if(err){
				console.log(err);
			}
			res.redirect("/campgrounds");
		});
	});
});

module.exports = router;