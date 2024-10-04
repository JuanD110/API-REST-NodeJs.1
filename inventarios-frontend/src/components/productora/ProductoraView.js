import React, { useEffect, useState } from 'react';
import { getProductora } from "../../services/productoraService";
import { ProductoraCard } from './ProductoraCard';
import Swal from 'sweetalert2';
import { ProductoraNew } from './ProductoraNew';

export const ProductoraView = () => {
  const [productora, setProductora] = useState([]);
  const [openModal, setOpenModal] = useState(false); 

  const listarProductora = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...',
      });
      Swal.showLoading();
      const { data } = await getProductora();
      console.log(data);
      Swal.close();
      setProductora(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listarProductora();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className="container">
      <div className="mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
        {productora.map((productoraItem) => {
          return (
            <ProductoraCard
              key={productoraItem._id}
              productora={productoraItem}
            />
          );
        })}
      </div>

      {openModal ? (
        <ProductoraNew
          handleOpenModal={handleOpenModal}
          listarProductoras={listarProductora}
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

