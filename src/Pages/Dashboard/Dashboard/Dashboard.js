import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    return (
        <div style={{ marginTop: '30vh' }} className='container m-4 flex items-center justify-center'>
            <h2 className='text-center font bold text-4xl'>
                Welcome Back
                <span className='text-secondary'>{user.displayName}</span> Your Dashboard
            </h2>
        </div>
    );
};

export default Dashboard;