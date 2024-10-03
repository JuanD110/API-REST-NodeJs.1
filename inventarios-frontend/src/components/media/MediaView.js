import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { getMedia } from "../../services/mediaService";
import { MediaCard } from "./MediaCard";
import { MediaNew } from "./MediaNew";

export const MediaView = () => {
  const[media, setMedia ] = useState([]);
  const [ openModal, setOpenModal ] = useState(false);


  const listarMedia = async() => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const { data } = await getMedia();
      console.log(data);
      Swal.close();
      setMedia(data);
      
    } catch (error){
      console.log(error);
    }
  }
  
  useEffect(() => {
    listarMedia();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  }

  
  return (
    <div className="container">
      <div className="mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
        {
          media.map((mediaItem) => {
            return <MediaCard key = { mediaItem._id} media = {mediaItem} />
            
          })
        }

    
          </div>
          {
            openModal ? <MediaNew
            handleOpenModal = { handleOpenModal}
            listarMedia = { listarMedia } /> :
            <button type= "button" className = "btn btn-primary agr" onClick={ handleOpenModal}>
          <i class="fa-solid fa-plus"></i>
          </button>
          }
          
        </div>
        )
    }
        

