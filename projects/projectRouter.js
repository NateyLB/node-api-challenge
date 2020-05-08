const router = require('express').Router();
const db = require('../data/helpers/projectModel.js');

//get all projects and reposnd with arr of projects
router.get('/', (req, res)=>{
    db.get()
    .then(projects=>{
        if(projects.length>0){
            res.status(200).json(projects)
        }
        else{
            res.status(500).json({message: "Projects could not be retrieved from the database"})
        }
    })
})
//get project by ID and respond with project
router.get('/:id', validateID, (req, res)=>{
    db.get(req.id)
    .then(project=>{
        if(project){
            res.status(201).json(project)
        }
        else{
            res.status(500).json({message: "Project could not be retrieved from the database"})
        }
    })
})
//get project's actions and respond with arr of project's actions
router.get('/:id/actions', validateID, (req, res)=>{
    db.getProjectActions(req.id)
    .then(actions=>{
        if(actions){
            if(actions.length >0){
                res.status(200).json(actions)
            }
            else{
                res.status(500).json({message: "Project does not have any actions"})
            }
        }
        else{
            res.status(500).json({message: "Project's actions could not be retrieved from the database"})
        }
    })
})
//create new project and respond with new project
router.post('/', validateName, validateDescription, (req, res)=>{
    const projectShape ={name: req.name, description:req.description, completed: false}
    db.insert(projectShape)
    .then(project =>{
        if(project){
            res.status(201).json(project)
        }
        else{
            res.status(500).json({message: "Project could not be added to the database"})
        }
    })
})
//update project and reposnd with updated project
router.put('/:id', validateID, validateName, validateDescription, validateCompleted, (req, res)=>{
    const projectShape = {name: req.name, description: req.description, completed: req.completed};
    db.update(req.id, projectShape)
    .then(project=>{
        if(project){
            res.status(200).json(project)
        }
        else{
            res.status(500).json({message: "Project could not be updated in the database"})
        }
    })
})
//delete project and repond with arr of updated projects
router.delete('/:id', validateID, (req, res)=>{
    db.remove(req.id)
    .then(numDeleted =>{
        if(numDeleted > 0){
            db.get()
            .then(projects => {
                res.status(200).json(projects)
            })
        }
        else{
            res.status(500).json({message: "Project could not be deleted in the database"})
        }
    })
})

//custom middleware

function validateName(req, res, next){
    if(!req.body.name){
        res.status(400).json({ message: "missing required name field" });
    }
    else{
        req.name = req.body.name;
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

function validateCompleted(req, res, next){
    if(!req.body.completed){
        res.status(400).json({ message: "missing required completed field" });
    }
    else{
        req.completed = req.body.completed;
        next();
    }
}

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
module.exports = router;