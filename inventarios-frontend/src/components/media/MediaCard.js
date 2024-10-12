
import React from 'react';
import { Link } from 'react-router-dom';



export const MediaCard = (props) => {
    
    const { media } = props

  return (

    <div className="col" >
        <div className="card">
            <img src={media.imagenPortada} className="card-img-top" alt="img"/>
            <div className="card-body">
                <p className="card-text">{`Serial: ${media.serial}`}</p>
                <p className="card-text">{`Titulo: ${media.titulo}`}</p>
                <p className="card-text">{`Año de estreno: ${media.añoEstreno}`}</p>
                  <Link to={`/media/edit/${media._id}`}>Ver más...</Link>
            </div>
        </div>
    </div>
      
 
  )
}
