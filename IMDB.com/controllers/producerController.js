var Producer = require('../models/producer');
// get all producers
module.exports.getProducersList = function(callback, limit){
    Producer.find(callback).limit(limit);
}

// get a producer
module.exports.getProducer  = function(id,callback){
    Producer.findById(id, callback);
}

// add a producer
module.exports.addProducer = function(producer,callback){
    Producer.create(producer, callback);
}
