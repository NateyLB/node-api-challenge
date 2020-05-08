import React from 'react';
import { Link } from "react-router-dom";

const ProjectCard = props =>{
    return(
        <Link to={`/project/${props.project.id}`} className="card">
            <h2>{props.project.name}</h2>
            <p>{props.project.description}</p>
            <p>Completed: {props.project.completed == true ? 'X': "not yet" }</p>
        </Link>
    )
}

export default ProjectCard;