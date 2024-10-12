import React from 'react';
import { Link } from 'react-router-dom';

export const ProductoraCard = (props) => {
    const { productora } = props

    return (
  
      <div className="col" >
          <div className="card">
              <div className="card-body">
                  <img src={productora.slogan} className="card-img-top" alt="img"/>
                  <p className="card-text">{`Nombres: ${productora.nombres}`}</p>
                  <p className="card-text">{`Estado: ${productora.estado}`}</p>
                  <p className="card-text">{`Descripcion: ${productora.descripcion}`}</p>
                  <Link to={`/productora/edit/${productora._id}`}>Ver más...</Link>
              </div>
          </div>
      </div>
    )
   
}