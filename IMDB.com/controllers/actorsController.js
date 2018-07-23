var Actor = require('../models/actor');

// get all actors
module.exports.getActors = function(callback,limit){
    Actor.find(callback).limit(limit);
}

// find similar types by filter
module.exports.getActorsByFiltering = function(filter,select,callback, limit){
    Actor.find(filter,select,callback).limit(limit);
}


// get a actor
module.exports.getActorById = function(id, callback){
    Actor.findById(id, callback);
}

// add a actor
module.exports.addActor= function(actor,callback){
    Actor.create(actor, callback);
}

// update actor detail
module.exports.updateActor = function(id,actor,options, callback){
    const where = {_id:id};
    const update = {
        name:actor.name,
        sex:actor.sex,
        "bio.movies":actor.movies
    }
    Actor.findOneAndUpdate(where, update,options, callback);
}

// {
//     "name":"mantu pani",
//       "sex":"M",
//       "DOB":"",
//       "bio":{
//           "birthIn":"odisha",
//         "movies":["my story"]
//       }
//   }