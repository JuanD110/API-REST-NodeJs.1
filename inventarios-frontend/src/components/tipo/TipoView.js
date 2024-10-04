import React, { useEffect, useState } from 'react';
import { getTipo } from "../../services/tipoService";
import { TipoCard } from './TipoCard';
import { crearTipo } from '../../services/tipoService'; 
import Swal from 'sweetalert2';
import { TipoNew } from './TipoNew';

export const TipoView = () => {
  const [tipo, setTipo] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const listarTipo = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...',
      });
      Swal.showLoading();
      const { data } = await getTipo();
      console.log(data);
      Swal.close();
      setTipo(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listarTipo();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className="container">
      <div className="mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
        {tipo.map((tipoItem) => {
          return <TipoCard key={tipoItem._id} tipo={tipoItem} />;
        })}
      </div>

    
      {openModal ? (
        <TipoNew
          handleOpenModal={handleOpenModal}
          listarTipo={listarTipo}
        />
      ) : (
        <button
          type="button"
          className="btn btn-primary agr"
          onClick={handleOpenModal}
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      )}
    </div>
  );
};


