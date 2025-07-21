const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const MONGO_URL ='mongodb://127.0.0.1:27017/wanderlust'



main()
.then((res) => {
    console.log("Connected to DB ");
})
.catch((err) => {
    console.log(err);
});

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("views engine" , "ejs");
app.set("views" , path.join(__dirname , "/views"));




app.get("/" , (req,res) => {
    res.send("Hi, I am root");
})

//Index Route
app.get("/listings" , async (req,res) => {
    const all_listings =   await Listing.find({});
    res.render("listings/index.ejs" , {all_listings});
})





app.listen(8080, ()=>{
    console.log("server is listening to port 8080");
})