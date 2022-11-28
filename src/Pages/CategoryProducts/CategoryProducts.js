import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import BookingModal from '../../Shared/BookingModal/BookingModal';
import ProductCard from './ProductCard';

const CategoryProducts = () => {
    const [sellerEmail, setSellerEmail] = useState([]);
    const [booking, setBooking] = useState(null);

    const params = useParams();

    console.log(params);

    
    const { data: products = [], refetch } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await fetch(`https://drim-store-server-dvsrshohan.vercel.app/category/${params.id}`);
            const data = await res.json();
            return data;
        }
    })
    const { data: user = {} } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await fetch(`https://drim-store-server-dvsrshohan.vercel.app/user?email=$${sellerEmail}`);
            const data = await res.json();
            return data;
        }
    })
    console.log(user);
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {
                products.map(product => <ProductCard
                    key={product._id}
                    product={product}
                    setBooking={setBooking}
                    refetch={refetch}
                ></ProductCard>
                )  
            }
            {
                booking && <BookingModal
                    booking={booking}
                    setBooking={setBooking}
                ></BookingModal>
            }
        </div>
    );
};

export default CategoryProducts;