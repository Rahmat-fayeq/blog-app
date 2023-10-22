const express = require('express');
const Article = require('../models/article');
const router = express.Router();

router.get('/new', function(req, res) {
    res.render('articles/new', {article:new Article});
});

router.get('/:slug', async function(req, res){
    try{
        const article = await Article.findOne({slug:req.params.slug});
        if(article==null){
             res.redirect('/');
        }
        return res.render('articles/show', {article:article});
    }catch(error){
        console.log(error);
    }
});

router.get('/:id/edit', async function(req, res){
    try {
      const article = await Article.findById(req.params.id);
      res.render('articles/edit', {article:article});  
    } catch (error) {
       console.log(error) 
    }
});

router.put('/:id', async(req, res)=>{
    try {
        const article = await Article.findByIdAndUpdate(req.params.id,{
            title: req.body.title,
            description: req.body.description,
            markdown: req.body.markdown
        });
        res.redirect(`/articles/${article.slug}`);
    } catch (error) {
        console.log(error);
        res.render('articles/${req.params.id}/edit', {article:req.body});
    }
});

router.post('/', async (req, res)=>{
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    });
    try {
        await article.save();
        res.redirect(`/articles/${article.slug}`);
    } catch (error) {
        console.log(error);
        res.render('articles/new', {article: article});
    }

});

router.delete('/:id', async (req, res)=>{
    try {
        const deletedArticle = await Article.findByIdAndDelete(req.params.id);
        if (deletedArticle){
            res.redirect('/');
        }
    } catch (error) {
       console.log(error); 
    }
});

module.exports = router;