const express = require('express');
const router = express.Router();
const Actor = require('../controllers/actorsController');

// Actor API's
// get all actors
router.get('/api/actors', function(req, res){
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
router.post('/api/actors', function(req, res){
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
router.put('/api/actors/:_id', function(req, res){
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
router.get('/api/actors/:_id', function(req, res){
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
router.get('/api/get-actors-select',function(req, res){
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
});



// End of Actor API's

module.exports = router;