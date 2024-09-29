import React, { useEffect, useState } from 'react';
import { getProductora } from "../../services/productoraService";
import { ProductoraCard } from './ProductoraCard';

export const ProductoraView = () => {
  const[productora, setProductora ] = useState([])

  const listarProductora = async() => {
    try{
      const { data } = await getProductora();
      console.log(data);
      setProductora(data);

    } catch (error){
      console.log(error);
    }
  }
  
  useEffect(() => {
    listarProductora();
  }, []);

  
  return (
    <div className="container">
      <div className="mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
        {
          productora.map((productoraItem) => {
            return <ProductoraCard key = { productoraItem._id} productora = {productoraItem} />
            
          })
        }
          </div>
        </div>
        )
    }
