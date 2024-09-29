import React, { useEffect, useState } from 'react';
import { getGeneros } from "../../services/generoService";
import { GeneroCard } from './GeneroCard';

export const GeneroView = () => {
  const[genero, setGenero ] = useState([])

  const listarGenero = async() => {
    try{
      const { data } = await getGeneros();
      console.log(data);
      setGenero(data);

    } catch (error){
      console.log(error);
    }
  }
  
  useEffect(() => {
    listarGenero();
  }, []);

  
  return (
    <div className="container">
      <div className="mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
        {
          genero.map((generoItem) => {
            return <GeneroCard key = { generoItem._id} genero = {generoItem} />
            
          })
        }
          </div>
        </div>
        )
    }
        

