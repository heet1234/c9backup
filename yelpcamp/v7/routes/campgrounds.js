var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");

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

router.get("/new", function(req, res) {
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

router.post("/", function(req, res){
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

module.exports = router;