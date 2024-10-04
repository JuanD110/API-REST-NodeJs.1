import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { getDirectores} from "../../services/directorService";
import { DirectorCard } from "./DirectorCard";
import { DirectorNew } from "./DirectorNew";

export const DirectorView = () => {
  const[director, setDirector ] = useState([]);
  const [ openModal, setOpenModal ] = useState(false);


  const listarDirectores = async() => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const { data } = await getDirectores();
      console.log(data);
      Swal.close();
      setDirector(data);
      
    } catch (error){
      console.log(error);
    }
  }
  
  useEffect(() => {
    listarDirectores();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  }

  
  return (
    <div className="container">
      <div className="mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
        {
          director.map((directorItem) => {
            return <DirectorCard key = { directorItem._id} director = {directorItem} />
            
          })
        }

    
          </div>
          {
            openModal ? <DirectorNew
            handleOpenModal = { handleOpenModal}
            listarDirectores = { listarDirectores } /> :
            <button type= "button" className = "btn btn-primary agr" onClick={ handleOpenModal}>
          <i class="fa-solid fa-plus"></i>
          </button>
          }
          
        </div>
        )
    }
        
  
