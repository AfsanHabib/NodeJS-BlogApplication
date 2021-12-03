const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

//Internal
const blogRouter = require('./routes/blogs');
const Blog = require('./models/Blog');
const app = express();

//connect to MongoDB
// mongoose.connect('mongodb://localhost/crudblog', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// });

mongoose
  .connect('mongodb://localhost/crudblog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DataBase Connection Success....."))
  .catch((err) => console.log(err));


//set template engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));


//route for the index
app.get('/', async (request, response) => {
  let blogs = await Blog.find().sort({ timeCreated: 'desc' });
  response.render('index', { blogs: blogs });
});

app.use(express.static('public'));
app.use('/blogs', blogRouter);

// //listen port
// app.listen(5000);

app.listen(5000,  ()=>{
  console.log("Listening on port 5000")
})
