const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const article = require('./models/article');

const app = express();
app.set('view engine','ejs');

mongoose.connect('mongodb://localhost/blog');

app.use(express.urlencoded({ extended:false}));
app.use(methodOverride('_method'));
app.use('/articles',require('./routes/articles'));
app.get('/', async(req, res) => {
    const articles = await article.find().sort({createdAt:'desc'});
    res.render('articles/index',{articles});
});

app.listen(3000,(req,res)=>{
    console.log(`server running on port${3000}`)
});