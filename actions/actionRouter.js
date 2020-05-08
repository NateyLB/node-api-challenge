const router = require('express').Router();

const db = require('../data/helpers/actionModel');

//get all actions and respond with 
router.get('/', (req, res)=>{
    db.get()
    .then(actions=>{
        if(actions.length>0){
            res.status(200).json(actions)
        }
        else{
            res.status(500).json({message: "Actions could not be retrieved from the database"})
        }
    })
})

//get action by ID and respond with action
router.get('/:id', validateID, (req, res)=>{
    db.get(req.id)
    .then(action=>{
        if(action){
            res.status(201).json(action)
        }
        else{
            res.status(500).json({message: "Action could not be retrieved from the database"})
        }
    })
})

//create new action for a project and respond with new action
router.post('/', validateProjectID, validateDescription, validateNotes, validateCompleted, (req, res)=>{
    const actionShape ={project_id: req.project_id, description:req.description, notes: req.notes, completed: req.completed};
    db.insert(actionShape)
    .then(action =>{
        if(action){
            res.status(201).json(action)
        }
        else{
            res.status(500).json({message: "Project could not be added to the database"})
        }
    })
})

//update action and respond with updated action
router.put('/:id', validateID, validateProjectID, validateDescription, validateNotes, validateCompleted,  (req, res)=>{
    const actionShape ={project_id: req.project_id, description:req.description, notes: req.notes, completed: req.completed};
    db.update(req.id, actionShape)
    .then(action =>{
        if(action){
            res.status(200).json(action)
        }
        else{
            res.status(500).json({message: "Action could not be updated in the database"})
        }
    })
})
//delete action by ID and respond with an arr of updated actions
router.delete('/:id', validateID, (req, res)=>{
    db.remove(req.id)
    .then(numDeleted=>{
        if(numDeleted > 0){
            db.get()
            .then(actions =>{
                res.status(200).json(actions)
            })
        }
        else{
            res.status(500).json({message: "Action could not be deleted in the database"})
        }
    })
})

//custom middleware
function validateID(req,res, next){
    db.get(req.params.id)
    .then(project =>{
        if(project){
            req.id=req.params.id;
            next();
        }
        else{
            res.status(400).json({error: "A user with that ID does not exist"})
        }
    })
}

function validateProjectID(req, res, next){
    if(!req.body.project_id){
        res.status(400).json({ message: "missing required project_id field" });
    }
    else{
        req.project_id = req.body.project_id;
        next();
    }
}

function validateDescription(req, res, next){
    if(!req.body.description){
        res.status(400).json({ message: "missing required description field" });
    }
    else{
        req.description = req.body.description;
        next();
    }
}


function validateNotes(req, res, next){
    if(!req.body.notes){
        res.status(400).json({ message: "missing required notes field" });
    }
    else{
        req.notes = req.body.notes;
        next();
    }
}

function validateCompleted(req, res, next){
    if(req.body.hasOwnProperty('completed') && (req.body.completed == false|| req.body.completed == true)){
        req.completed = req.body.completed;
        next();
    }
    else{
        res.status(400).json({ message: "missing required completed field" });
    }
}

module.exports = router;
