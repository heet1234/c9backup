var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2", { useNewUrlParser: true });

var Post = require("./models/post");

var User = require("./models/user");

// User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
//   if (err) {
//       console.log(err);
//   } else {
//       console.log(user);
//   } 
// });

Post.create({
  title: "how to cook the best burger pt. 4",
  content: "we have already made the best burger. what do you want now?"
}, function(err, post){
    User.findOne({email: "bob@gmail.com"}, function (err, foundUser) {
      if (err) {
          console.log(err);
      } else {
          foundUser.posts.push(post._id);
          foundUser.save(function(err, data){
              if (err) {
                  console.log(err);
              } else {
                  console.log(data);
              } 
          });
      } 
    });
});

// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Belcher"
// });




