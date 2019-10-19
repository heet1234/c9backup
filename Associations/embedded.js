var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo", { useNewUrlParser: true });

// POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model("Post", postSchema);

// USER - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
var User = mongoose.model("User", userSchema);

// var newUser = new User({
//   email: "walterwhite@methmaking.com",
//   name: "Walter White"
// });

// newUser.posts.push({
//   title: "i make meth",
//   content: "around 100pounds a day"
// });

// newUser.save(function(err, user){
//   if (err) {
//       console.log(err);
//   } else {
//       console.log(user);
//   } 
// });

// var newPost = new postModel({
//     title: "B<3T",
//     content: "Bhindiii and Tamatar are best friends forever"
// });

// newPost.save(function(err, post){
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });

User.findOne({name: "Walter White"}, function(err, user){
    if (err) {
        console.log(err);
    } else {
        user.posts.push({
           title: "Skyler Grey",
           content: "i love her and i can do anything for her"
        });
        user.save(function(err, user){
           if (err) {
               console.log(err);
           } else {
               console.log(user);
           }
        });
    }
});













