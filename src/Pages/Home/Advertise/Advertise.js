import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import BookingModal from '../../../Shared/BookingModal/BookingModal';
import AdvertiseProductCard from './AdvertiseProductCard';

const Advertise = () => {

    const [booking, setBooking] = useState(null)

    const { data: products = [] } = useQuery({
        queryKey: ['advertise','product'],
        queryFn: async () => {
            const res = await fetch(`https://drim-store-server-dvsrshohan.vercel.app/advertise/product`);
            const data = await res.json();
            console.log(data);
            return data;
        }
    })

    return (
        <section>
            {
                products.length > 0 &&


                <div className="">
                    <h2 className='text-3xl font-semibold text-center'>Advertise Section</h2>
                    <div className="bg-secondary h-1 w-1/6 mx-auto"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {
                            products.map(product => <AdvertiseProductCard
                                key={product._id}
                                product={product}
                                setBooking={setBooking}
                            ></AdvertiseProductCard>)
                        }
                    </div>
                    {booking &&
                        <BookingModal
                            booking={booking}
                            setBooking={setBooking}
                        ></BookingModal>
                    }

                </div>
         }

        </section>
    );
};

export default Advertise;