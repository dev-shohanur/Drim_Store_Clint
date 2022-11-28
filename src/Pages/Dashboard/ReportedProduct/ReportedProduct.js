import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import { FaBeer, FaCheckCircle } from 'react-icons/fa';


const ReportedProduct = ({ product }) => {
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

    const handleDeleteProduct = id => {
        fetch(`http://localhost:5000/product/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)

                if (data.deletedCount > 0) {
                    toast.success('Product Delete Successful.')
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
                    <button
                        onClick={() => handleDeleteProduct(product?._id)}
                        className='btn btn-secondary'
                    >delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportedProduct;