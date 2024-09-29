import React from 'react';
import { Link } from 'react-router-dom';



export const TipoCard = (props) => {
    
    const { tipo } = props

  return (

    <div className="col" >
        <div className="card">
            <div className="card-body">
                <p className="card-text">{`Nombres: ${tipo.nombres}`}</p>
                <p className="card-text">{`Descripcion: ${tipo.descripcion}`}</p>
            </div>
        </div>
    </div>
      
 
  )
}