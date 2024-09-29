import React, { useEffect, useState } from 'react';
import { getTipo } from "../../services/tipoService";
import { TipoCard } from './TipoCard';

export const TipoView = () => {
  const[tipo, setTipo ] = useState([])

  const listarTipo = async() => {
    try{
      const { data } = await getTipo();
      console.log(data);
      setTipo(data);

    } catch (error){
      console.log(error);
    }
  }
  
  useEffect(() => {
    listarTipo();
  }, []);

  
  return (
    <div className="container">
      <div className="mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
        {
          tipo.map((tipoItem) => {
            return <TipoCard key = { tipoItem._id} tipo = {tipoItem} />
            
          })
        }
          </div>
        </div>
        )
    }
        

