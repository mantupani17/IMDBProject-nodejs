const express = require('express');
const router = express.Router();
const Movie = require('../controllers/moviesController');


// Movie API's
// get all movies
router.get('/api/movies', function(req, res){
    const result = {status:true, data:[]}
    Movie.getMovies(function(err, movies){
        if(err){
            return {status:false, data:[]};
            throw err;
        }
        result.data = movies;
        res.json(result);
    })
});

// get movie by id
router.get('/api/movies/:_id', function(req, res){
    Movie.getMovie(req.params._id, function(err, movie){
        if(err){
            throw err;
        }
        res.json(movie);
    })
});

router.get('/api/movies-options',function(req, res){
    const result = {status:true, data:[]}
    Movie.getMovies({},'_id, name',function(err, movies){
        if(err){
            return {status:false, data:[]};
            throw err;
        }
        result.data = movies;
        res.json(result);
    })
})


router.post('/api/movies', function(req, res){
    const result = {status:true, message:"Movie added successfully",data:[]};
    const formData = req.body;
    let plot = formData['showTime[]'];
    if(plot == undefined){
        plot = formData['showTime'];
    }
    const movie = {
        name:formData['movieName'],
        YOR:formData['movieReleaseYear'],
        plot:plot,
        actors:[],
        producer:{_id:"",name:""}
    };
    Movie.addMovie(movie, function(err, movie){
        if(err){
            console.log(err);
            res.json({status:false, message:"Adding movie is failed", data:[]})
            throw err;
        }
        result.data = movie;
        res.json(result);
    });
});

router.put('/api/movies', function(req, res){
    const result = {status:true, message:"Actors added successfully",data:[]};
    const formData = req.body;
    let actors = [];
    let actor = {};
    let actorsData = formData['actors[]'];
    const _id = formData['movie'];
    if( actorsData == undefined){
        actor = formData['actors'].split('####');
        actors.push({_id:actor[0],name:actor[1]});
    }else{
        for(var i=0;i<actorsData.length;i++){
            actor = actorsData[i].split('####');
            actors.push({_id:actor[0],name:actor[1]});
        }
    }
    Movie.updateMovie(_id,actors,function(err, movies){
        if(err){
            res.json({status:false,message:'Adding actors failed',data:[]});
            throw err;
        }
        result.data = movies;
        res.json(result);
    });
});


router.delete('/api/movies',function(req, res){
    const result = {status:true, message:"Movie deleted successfully",data:[]};
    const formData = req.body;
    const _id = formData['movieId'];
    Movie.deleteMovie(_id,function(err, movie){
        if(err){
            res.json({status:false,message:'Deleting movie failed',data:[]});
            throw err;            
        }
        result.data = movie;
        res.json(result);

    });
});
// End of Movie API's

module.exports = router;