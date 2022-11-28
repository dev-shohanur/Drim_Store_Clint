import { useQuery } from '@tanstack/react-query';
import { FaBeer, FaCheckCircle } from 'react-icons/fa';

import React from 'react';
import toast from 'react-hot-toast';

const ProductCard = ({ product, setBooking }) => {



    const {
        _id,
        productImg,
        productName,
        originalPrice,
        productPrice,
        condition,
        category,
        yearOfPurchase,
        mobilNumber,
        location,
        description,
        date,
        email

    } = product;


    console.log(email);
    const { data: user = {}, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {

            const res = await fetch(`http://localhost:5000/user?email=${email}`);
            const data = await res.json();
            return data;
        }
    })
    if (!user === {}) {
        console.log(user?.name);
    } else (
        refetch()
    )
    const handleProductReportToAdmin = id => {
        fetch(`http://localhost:5000/productReportToAdmin/${id}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)

                if (data.modifiedCount > 0) {
                    toast.success('Product Report to Admin Successful.')
                    refetch()
                }

            })
    }

    return (
        <div className="card m-4 bg-base-100 shadow-xl">
            <figure><img className='w-3/4 m-2' src={productImg} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{productName}</h2>
                <p>Original Price : ৳ {originalPrice}</p>
                <p>Resale Price : ৳ {productPrice}</p>
                <p>Year of purchase : {yearOfPurchase}</p>
                <p>Post Date : {date}</p>
                <p>Mobil Number : {mobilNumber}</p>
                <p>Location : {location}</p>
                <p>condition : {condition}</p>
                <p>{description}</p>
                <div className="card-actions items-center justify-between">

                    <h2 className="text-2xl font-bold flex items-center">
                        {user?.name}
                        {user?.status === "verify" && <FaCheckCircle className='text-blue-600 ml-2' />}
                    </h2>
                    <label onClick={() => setBooking(product)} htmlFor="booking-modal" className="btn btn-primary hover:btn-secondary">Book Now</label>
                </div>

                {product?.productReport ?
                    <>
                        <button className='btn btn-secondary' disabled>
                            Report to Admin
                        </button>
                    </>
                    :
                    <button onClick={() => handleProductReportToAdmin(_id)}
                        className='btn btn-secondary'>
                        Report to Admin
                    </button>
                }
            </div>
        </div>
    );
};

export default ProductCard;