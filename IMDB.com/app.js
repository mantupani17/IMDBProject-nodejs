var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');



// set view engine
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

// body-parser middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));       


// set static path
app.use(express.static(path.join(__dirname, 'public')));

var Movie = require('./controllers/moviesController');
var Actor = require('./controllers/actorsController');
var producerController = require('./controllers/producerController');
// connect to DB
mongoose.connect('mongodb://localhost/IMDB');
var db = mongoose.connection;



app.get('/', function(req, res){
    res.render('index');
});


// Actor API's
// get all actors
app.get('/api/actors', function(req, res){
    const result = {status:true, data:[]};
    Actor.getActors(function(err, actors){
        if(err){
            return {status:false, data:[]};
            throw err;
        }
        result.data = actors;
        res.json(result);
    });
});

// add actor
app.post('/api/actors', function(req, res){
    const result = {status:true, message:"Actor added successfully",data:[]};
    const formData = req.body;
    const actor = {
        name:formData['actorName'],
        sex:formData['sex'],
        DOB:new Date(formData['actorDob']),
        bio:{
            birthIn:formData['actorDbp'],
            movies:[]
        }
    };
    Actor.addActor(actor,function(err, actor){
        if(err){
            console.log(err);
            res.json({status:false, message:"Adding actor is failed"})
            throw err;
        }
        result.data = actor;
        res.json(result);
    });
});

// update actor
app.put('/api/actors/:_id', function(req, res){
    const _id = req.params._id;
    const actor = req.body;
    Actor.updateActor(_id, actor, {}, function(err, actor){
        if(err){
            throw err;
        }
        res.json(actor);
    });
});

// get actor by id
app.get('/api/actors/:_id', function(req, res){
    const result = {status:true, data:[]};
    Actor.getActorById(req.params._id, function(err, actor){
        if(err){
            res.json(result);
            throw err;
        }
        result.data = actor;
        res.json(result);
    })
});

// get actors by filter
app.get('/api/get-actors-select',function(req, res){
    const result = {status:true, data:[]};
    const select = ['_id','name','sex'];
    const where = {};
    Actor.getActorsByFiltering(where, select, function(err, actors){
        if(err){
            res.json(result);
            throw err;
        }
        result.data = actors;
        res.json(result);
    })
})



// End of Actor API's

// Movie API's
// get all movies
app.get('/api/movies', function(req, res){
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
app.get('/api/movies/:_id', function(req, res){
    Movie.getMovie(req.params._id, function(err, movie){
        if(err){
            throw err;
        }
        res.json(movie);
    })
});

app.get('/api/movies-options',function(req, res){
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


app.post('/api/movies', function(req, res){
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

app.put('/api/movies', function(req, res){
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


app.delete('/api/movies',function(req, res){
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


// Producer API's
// get all producers
app.get('/api/producers', function(req, res){
    const result = {status:true, data:[]};
    producerController.getProducersList(function(err, producers){
        if(err){
            return {status:false, data:[]};
            throw err;
        }
        result.data = producers;
        res.json(result);
    })
});

// add actor
app.post('/api/producers', function(req, res){
    const result = {status:true, message:"Producer added successfully",data:[]};
    const formData = req.body;
    
    const producer = {
        name:formData['producerName'],
        sex:formData['sex'],
        DOB:new Date(formData['producerDob']),
        bio:{
            birthIn:formData['producerDbp'],
            movies:[]
        }
    };
    
    producerController.addProducer(producer,function(err, producer){
        if(err){
            console.log(err);
            res.json({status:false, message:"Adding producer is failed",data:[]})
            throw err;
        }
        result.data = producer;
        res.json(result);
    });
});



// End of producer API's

app.listen(3000);
console.log('running on 3000');