import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AllSeller = () => {
    const { data: sellers = [], refetch } = useQuery({
        queryKey: ['dashboard'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/dashboard/Seller');
            const data = await res.json();
            return data;
        }
    })

    const handleDeleteSeller = id => {
        fetch(`http://localhost:5000/dashboard/seller/${id}`, {
            method: 'DELETE',
            // headers: {
            //     authorization: `bearer ${localStorage.getItem('accessToken')}`
            // }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)

                if (data.deletedCount > 0) {
                    toast.success('Seller Delete Successful.')
                    refetch()
                }

            })
    }
    const handleVerifySeller = id => {
        fetch(`http://localhost:5000/dashboard/seller/${id}`, {
            method: 'PUT',
            // headers: {
            //     authorization: `bearer ${localStorage.getItem('accessToken')}`
            // }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)

                if (data.modifiedCount > 0) {
                    toast.success('Seller Verify Successful.')
                    refetch()
                }

            })
    }


    return (
        <div>
            <h2 className="text-3xl">All Sellers</h2>


            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Verify</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sellers?.map((user, i) => <tr key={user._id}>
                                <th>{i + 1}</th>
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td>
                                    {user?.status === 'verify' ?
                                        'Vrifyed'
                                        :
                                        <button onClick={() => handleVerifySeller(user?._id)} className='btn btn-xs btn-warning'>Verify</button>
                                    }
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteSeller(user?._id)} className='btn btn-xs btn-warning'>Delete</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllSeller;