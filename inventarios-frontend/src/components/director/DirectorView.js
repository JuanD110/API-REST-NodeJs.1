import React, { useEffect, useState } from "react";
import { getDirectores } from "../../services/directorService";

export const DirectorView = () => {

  const [directores, setDirectores ] = useState([])

  const listarDirectores = async() => {
    try{
      const { data } = await getDirectores();
      console.log(data);
      setDirectores(data);

    } catch (error){
      console.log(error);
    }
  }
  
  useEffect(() => {
    listarDirectores();
  }, []);

  
  return (
    <div className="container">
      <div className="mt-2 mb-2 row row-cols-1 row-cols-md-2 g-4">
        {
          directores.map((director) => {
            return (
              <div className="col">
                <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Director</h5>
                      <p className="card-text">{`Nombre: ${director.nombres}`}</p>
                      <p className="card-text">{`Estado: ${director.estado}`}</p>

                    </div>
                  </div>
                </div>
            );
          })
        }
          </div>
        </div>
        )
    }
        


