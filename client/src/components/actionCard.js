import React from 'react';

const ActionCard = props =>{

    return(
        <div className='card'>  
            <h3>{props.action.description}</h3>
            <p>{props.action.notes}</p>
            <p>Completed: {props.action.completed == true ? 'X': "not yet" }</p>
        </div>
    )
}

export default ActionCard;