import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import BookingModal from '../../../Shared/BookingModal/BookingModal';
import ReportedProduct from './ReportedProduct';

const ReportedProducts = () => {
    const { data: products = [], refetch } = useQuery({
        queryKey: ['product'],
        queryFn: async () => {

            const res = await fetch(`https://drim-store-server-dvsrshohan.vercel.app/report/product`);
            const data = await res.json();
            return data;
        }
    })
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
            
            {
                products.map(product => <ReportedProduct
                    key={product._id}
                    product={product}
                    refetch={refetch}
                ></ReportedProduct>
                )
            }
        </div>
    );
};

export default ReportedProducts;