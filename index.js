const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const connectDB = require('./config/db')
const Movie = require('./models/Movie')
const dotenv = require('dotenv')

const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']

dotenv.config()

connectDB()

app.set('view engine', 'ejs');
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));

app.get('/', async (req, res, next) => {
  try{
    const movie  = await Movie.find();
    res.render("index", {
      movie
    });
  }catch (err){
    console.log("err: "+ err); 
  }
})

app.post('/add', async (req, res, next) => {

   const { name, type, img } =req.body
   console.log(type, img);
   const movie = new Movie ({
      name,
      type
   })
   saveImage(movie, img)

   try {
      const newMovie = await movie.save()
      res.redirect('/')
   } catch (error) {
      console.error(error)
   }

})

// SAVE IMAGE AS BINARY
function saveImage( movie, imgEncoded) {
   if(imgEncoded === null) return

   const img = JSON.parse(imgEncoded)

   if(img != null && imageMimeTypes.includes(img.type)){
      movie.img = new Buffer.from(img.data, 'base64')
      movie.imgType = img.type
   }
}


app.listen(5000, () => console.log('server is on port 5000'))