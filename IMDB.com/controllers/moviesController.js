var Movie = require('../models/movie');

module.exports.getMovies = function(callback, limit){
    Movie.find(callback).limit(limit);
}

module.exports.getMovies = function(filter, select, callback, limit){
    Movie.find(filter, select, callback).limit(limit);
}

module.exports.getMovie = function(id, callback){
    Movie.findById(id, callback);
}

// add a movie
module.exports.addMovie = function(movie,callback){
    Movie.create(movie, callback);
}

// update actor detail
module.exports.updateMovie = function(id,actors,options, callback){
    const where = {_id:id};
    const updateAt = {$addToSet:{actors:actors}};
    Movie.findOneAndUpdate(where, updateAt,options, callback);
}

// delete moviee
module.exports.deleteMovie = function(id, actors,callback){
    const where = {_id:id};
    Movie.deleteOne(where,actors, callback);
}


