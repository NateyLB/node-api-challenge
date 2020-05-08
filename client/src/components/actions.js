import React, {useState, useEffect} from 'react';
import { useRouteMatch } from "react-router-dom";
import axios from 'axios';

import ActionCard from './actionCard.js';


const Actions = props =>{
    const { url } = useRouteMatch();
    const [actions, setActions] = useState([]);
    const id= url.slice(-1)

    useEffect(()=>{
        axios.get(`http://localhost:5000/projects/${id}/actions`)
        .then(actions =>{
            setActions(actions.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
    const actionCards = actions.map(action=> <ActionCard key={action.id} action={action}/> )
    console.log(actions)
    return(
        <div className='cards'>
            {actionCards}
        </div>
    )
}

export default Actions;