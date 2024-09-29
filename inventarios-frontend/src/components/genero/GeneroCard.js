import React from 'react';

export const GeneroCard = (props) => {
    const { genero } = props

    return (
  
      <div className="col" >
          <div className="card">
              <div className="card-body">
                  <p className="card-text">{`Genero: ${genero.nombres}`}</p>
                  <p className="card-text">{`Estado: ${genero.estado}`}</p>
                  <p className="card-text">{`Descripcion: ${genero.descripcion}`}</p>
              </div>
          </div>
      </div>
    )
   
}