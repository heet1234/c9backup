var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var campgrounds = [
    {name: "Salmon Creek", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3albiK3ZVUotR1EgeFhKYA0cAt8--meHx4_q7QucOZ-EbcznMiQ"},
    {name: "Granite Hill", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXkO0GHF94MyNe3odI73WuPVoVDFgYwK7mh0LUH023OsbPgzQP"},
    {name: "Mountain Goat's Rest", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjBTl276yVhAVc7qpXJVPN_CbzWu0ejlIpyM5BLJBPvBSFlVEEpg"},
    {name: "Salmon Creek", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3albiK3ZVUotR1EgeFhKYA0cAt8--meHx4_q7QucOZ-EbcznMiQ"},
    {name: "Granite Hill", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXkO0GHF94MyNe3odI73WuPVoVDFgYwK7mh0LUH023OsbPgzQP"},
    {name: "Mountain Goat's Rest", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjBTl276yVhAVc7qpXJVPN_CbzWu0ejlIpyM5BLJBPvBSFlVEEpg"},
    {name: "Salmon Creek", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3albiK3ZVUotR1EgeFhKYA0cAt8--meHx4_q7QucOZ-EbcznMiQ"},
    {name: "Granite Hill", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXkO0GHF94MyNe3odI73WuPVoVDFgYwK7mh0LUH023OsbPgzQP"},
    {name: "Mountain Goat's Rest", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjBTl276yVhAVc7qpXJVPN_CbzWu0ejlIpyM5BLJBPvBSFlVEEpg"}
];

app.get("/", function (req, res) {
    // body...
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {
    // body...
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", function(req, res) {
    //body...
   res.render("new"); 
});

app.post("/campgrounds", function(req, res){
    //body...
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});
 
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!") 
});