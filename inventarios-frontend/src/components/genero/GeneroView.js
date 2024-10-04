import React, { useEffect, useState } from 'react';
import { getGeneros } from "../../services/generoService";
import { GeneroCard } from './GeneroCard';
import Swal from 'sweetalert2';
import { GeneroNew } from './GeneroNew';

export const GeneroView = () => {
  const[genero, setGenero ] = useState([])
  const [ openModal, setOpenModal ] = useState(false);

  const listarGenero = async() => {
    try{
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const { data } = await getGeneros();
      console.log(data);
      Swal.close();
      setGenero(data);

    } catch (error){
      console.log(error);
    }
  }
  
  useEffect(() => {
    listarGenero();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  }


  
  return (
    <div className="container">
      <div className="mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
        {
          genero.map((generoItem) => {
            return <GeneroCard key = { generoItem._id} genero = {generoItem} />
            
          })
        }
          </div>
          {
            openModal ? <GeneroNew
            handleOpenModal = { handleOpenModal}
            listarGeneros = { listarGenero } /> :
            <button type= "button" className = "btn btn-primary agr" onClick={ handleOpenModal}>
          <i class="fa-solid fa-plus"></i>
          </button>
          }
          
        </div>
        )
    }
        

