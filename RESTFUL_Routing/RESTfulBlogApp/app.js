var express           = require("express"),
    methodOverride    = require("method-override"),
    expressSanitizer  = require("express-sanitizer"),
    mongoose          = require("mongoose"),
    bodyParser        = require("body-parser"),
    app               = express();
  

// APP CONFIG  

mongoose.connect("mongodb://localhost/restful_blog_app", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));


// MONGOOSE/MODEL CONFIG

var blogSchema = new mongoose.Schema({
   title: String,
   image: String,
   body:  String,
   created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema); 

// Blog.create({
//   title: "Test Blog",
//   image: "https://imageresizer.static9.net.au/ajXtWFyJjoZov19NQGzpSOXP0MU=/1024x0/http%3A%2F%2Fprod.static9.net.au%2F_%2Fmedia%2FNetwork%2FImages%2F2017%2F02%2F03%2F11%2F03%2Fcamping-sleep-cycle.jpg",
//   body: "HELLO THIS IS A BLOG POST!"
// });


// RESTFUL ROUTES

app.get("/", function(req, res) {
    // body...
    res.redirect("/blogs");
});

app.get("/blogs", function (req, res) {
    // body...
    Blog.find({}, function (err, blogs) {
        // body...
        if (err) {
            console.log(err);
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

app.get("/blogs/new", function(req, res) {
   res.render("new"); 
});

app.post("/blogs", function (req, res){ 
    // body...
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function (err, newBlog) {
        // body...
       if (err) {
           res.render("new");
       } else {
           res.redirect("/blogs");
       }
    });
});

app.get("/blogs/:id", function(req, res) {
   Blog.findById(req.params.id, function (err, foundBlog) {
       // body...
       if(err){
           res.redirect("/blogs");
       } else{
           res.render("show", {blog: foundBlog});
       }
   });
});

app.get("/blogs/:id/edit", function(req, res) {
   Blog.findById(req.params.id, function (err, foundBlog) {
       // body...
       if(err){
           res.redirect("/blogs");
       } else{
           res.render("edit", {blog: foundBlog});
       }
   });
});

app.put("/blogs/:id", function (req, res) {
    // body...
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if (err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
       if (err) {
           res.redirect("/blogs");
       } else {
           res.redirect("/blogs");
       } 
    });
});

app.listen(process.env.PORT, process.env.IP, function () {
    // body...
    console.log("SERVER IS RUNNING!");
});