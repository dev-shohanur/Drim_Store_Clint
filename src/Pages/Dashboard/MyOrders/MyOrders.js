import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';

const MyOrders = () => {
    const { user } = useContext(AuthContext)
    const { data: MyOrders = [], refetch } = useQuery({
        queryKey: ['dashboard'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/bookings?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    })
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
                        <th>Payment</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        MyOrders.map((product, i) =>
                            <tr className='text-center'>
                                <th>{i + 1}</th>
                                <td>
                                    <img className='w-1/4' src={product?.productImg} alt="" srcset="" />
                                </td>
                                <td>{product?.productName}</td>
                                <td>৳ {product?.productPrice}</td>
                                <td>{product?.soldStatus}</td>
                                <td>
                                    {product.productPrice && !product.paid && 
                                        <Link to={`/dashboard/payment/${product?._id}`}>
                                            <button
                                                className='btn btn-xs btn-secondary'>
                                                Pay
                                            </button>
                                        </Link>
                                    }
                                    {product.productPrice && product.paid && 
                                        <p className="text-xl text-success">
                                            Paid
                                        </p>
                                    }
                                </td>
                            </tr>
                        )
                    }

                </tbody>
            </table>
        </div>
    );
};

export default MyOrders;