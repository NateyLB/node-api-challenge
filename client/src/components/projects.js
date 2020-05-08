import React, {useState, useEffect} from 'react';
import axios from 'axios';

import ProjectCard from './projectCard.js'

const Projects = props =>{

    const [projects, setProjects] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:5000/projects')
        .then(projects=>{
            setProjects(projects.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    const projectCards = projects.map(project=> <ProjectCard key={project.id} project={project}/> )
    console.log(projects)
    return(
        <div className="cards">
            {projectCards}
        </div>
    )
}
export default Projects;