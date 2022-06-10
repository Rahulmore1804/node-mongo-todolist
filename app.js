//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// creating database
mongoose.connect("mongodb+srv://rmoray11:Sincostan9%40@cluster0.qvjgby3.mongodb.net/todolistDB", { useNewUrlParser: true })

const itemSchema = {
  name: String
}
const Item = mongoose.model("Item",itemSchema)

const item1 = new Item({
  name : "Welcome to todolist"
})
const item2 =new  Item({
  name : "hit  the + button to add new item"
})
const item3 =new  Item({
  name : "<-- hit this to delete item"
})

const defaulitem = [item1,item2,item3];

// 




app.get("/", function(req, res) {

Item.find({},function(err,founditem){
 

  if (founditem.length  === 0){
    Item.insertMany(defaulitem,function(err){
      if (err){
        console.log(err)
      }
      else{
        console.log("done")
      }
    })
    res.redirect("/")

  }
  else{
  
  res.render("list", {listTitle: "Today", newListItems: founditem});
  }
})

  

});

app.post("/", function(req, res){

  const itemname = req.body.newItem;

  const item = new Item({
    name :itemname
  })
  item.save()
  res.redirect("/")
  
});

app.post("/delete",function(req,res){
  console.log("deleted")
  const checklist = req.body.checkbox
  Item.findByIdAndRemove(checklist,function(err){
    if(!err){
      console.log("deleted")
      res.redirect("/")
    }
  })

})


app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

let port = process.env.PORT;
if(port == null || port ==""){
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started on port 3000");
});
