const express = require('express');
const router = express.Router();
const Producer = require('../controllers/producerController');

// Producer API's
// get all producers
router.get('/api/producers', function(req, res){
    const result = {status:true, data:[]};
    Producer.getProducersList(function(err, producers){
        if(err){
            return {status:false, data:[]};
            throw err;
        }
        result.data = producers;
        res.json(result);
    })
});

// add actor
router.post('/api/producers', function(req, res){
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
    
    Producer.addProducer(producer,function(err, producer){
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


module.exports = router;