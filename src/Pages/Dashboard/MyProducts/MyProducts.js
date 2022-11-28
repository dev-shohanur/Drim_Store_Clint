import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider';
import MyProduct from './MyProduct';

const MyProducts = () => {
    const {user} = useContext(AuthContext)
    const { data: myProducts = [], refetch } = useQuery({
        queryKey: ['dashboard'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/dashboard/product/${user?.email}`);
            const data = await res.json();
            return data;
        }
    })

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
    const handleAdvertiseProduct = id => {
        fetch(`http://localhost:5000/product/${id}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)

                if (data.modifiedCount > 0) {
                    toast.success('Product Advertise Successful.')
                    refetch()
                }

            })
    }
    return (
        <div className="overflow-x-auto my-4 mx-2">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Product Img</th>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Sold Status</th>
                        <th>Advertise</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        myProducts.map((product,i) => 
                            <tr className='text-center'>
                                <th>{i+1}</th>
                                <td>
                                    <img className='w-1/4' src={product?.productImg} alt="" srcset="" />
                                </td>
                                <td>{product?.productName}</td>
                                <td>৳ {product?.productPrice}</td>
                                <td>{product?.soldStatus}</td>
                                <td>
                                    {product?.soldStatus === 'unsold' &&
                                        !product?.advertise &&
                                        <button
                                            onClick={() => handleAdvertiseProduct(product?._id)}
                                            className='btn btn-xs btn-primary mr-2'>
                                            Advertise
                                        </button>
                                    }
                                    {product?.advertise && 
                                        <p>Advertised</p>
                                    }
                                    
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteProduct(product?._id)}
                                        className='btn btn-xs btn-secondary'
                                    >delete
                                    </button>
                                </td>
                            </tr>
                            )
                    }
                    
                </tbody>
            </table>
        </div>
    );
};

export default MyProducts;