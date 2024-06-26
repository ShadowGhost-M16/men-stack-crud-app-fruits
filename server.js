const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}` );
} );
  //IMPORT ROUTES
const Fruit= require('./models/fruit.js');

//middleware

app.use(express.urlencoded({ extended: false }));

// GET /
app.get("/", async (req, res) => {
    res.render("index.ejs");
  });

//get /fruits/new
// server.js
app.get("/fruits",async (req, res) => {
    const allFruits = await Fruit.find();
    console.log(allFruits)
    res.render('fruits/index.ejs', {fruits: allFruits})
})
// GET /fruits/new
app.get("/fruits/new", (req, res) => {
    res.render("fruits/new.ejs");
  });
  app.get('/fruits/:fruitId',  async (req, res) => {
    res.send(`This route renders th show page for the fruit id: ${req.params.fruitsId}`)
  })
// POST /fruits
app.post("/fruits", async (req, res) => {
       if(req.body.isReadyToEat === "on") {
        req.body.isReadyToEat = true;
        } else {
        req.body.isReadyToEat = false;
        }
        await Fruit.create(req.body);
        
    res.redirect("fruits/new");
  });
  

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});