import React from 'react';
import { Link } from 'react-router-dom';



export const DirectorCard = (props) => {
    
    const { director } = props

  return (

    <div className="col" >
        <div className="card">
    
            <div className="card-body">
                <p className="card-text">{`Nombres: ${director.nombres}`}</p>
                <p className="card-text">{`Estado: ${director.estado}`}</p>
                
            </div>
        </div>
    </div>
      
 
  )
}