var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cat_app", { useNewUrlParser: true });

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// var slash = new Cat({
//   name: "Mrs. Norris",
//   age: 7,
//   temperament: "Evil"
// });

// slash.save(function(err, cat){
//     if(err){
//         console.log("SOMETHING WENT WRONG");
//     }
    
//     else{
//         console.log("WE JUST SAVE A CAT TO DB");
//         console.log(cat);
//     }
// });

Cat.create({
    name: "tide",
    age: 7,
    temperament: "Grouchy"
}, {
    name: "trux",
    age: 6,
    temperament: "Subtle"
    
}, function(err, cat){
    if (err) {
        console.log(err);
    } else {
        console.log(cat);
    }
});


Cat.find({}, function (err, cats) {
    // body...
    if (err) {
        console.log("OH NO, ERROR!");
        console.log(err);
    } else {
        console.log("ALL THE CATS...")
        console.log(cats);
    }
});




