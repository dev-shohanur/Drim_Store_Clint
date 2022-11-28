import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AllBuyer = () => {
    const { data: buyers = [], refetch } = useQuery({
        queryKey: ['dashboard'],
        queryFn: async () => {
            const res = await fetch('https://drim-store-server-dvsrshohan.vercel.app/dashboard/Buyer');
            const data = await res.json();
            return data;
        }
    })

    const handleDeleteBuyer = id => {
        fetch(`https://drim-store-server-dvsrshohan.vercel.app/dashboard/buyer/${id}`, {
            method: 'DELETE',
            // headers: {
            //     authorization: `bearer ${localStorage.getItem('accessToken')}`
            // }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)

                if (data.deletedCount > 0) {
                    toast.success('Buyer Delete Successful.')
                    refetch()
                }

            })
    }


    return (
        <div>
            <h2 className="text-3xl">All Users</h2>


            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            buyers?.map((user, i) => <tr key={user._id}>
                                <th>{i + 1}</th>
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td>
                                    <button onClick={() => handleDeleteBuyer(user?._id)} className='btn btn-xs btn-warning'>Delete</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBuyer;