const express = require('express');
const router = express.Router();

router.get('/movie', function(req, res){
    res.render('movie',{title:'Movie | IMDB'});
});

router.get('/actor', function(req, res){
    res.render('actors',{title:'Actor | IMDB'});
});

router.get('/producer',  function(req, res){
    res.render('producer',{title:'Producer |  IMDB'});
});

router.get('/', function(req, res){
    res.render('index',{title:'IMDB'});
});


module.exports = router;