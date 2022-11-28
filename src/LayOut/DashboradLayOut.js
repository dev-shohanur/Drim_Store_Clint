import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import useAdmin from '../Hooks/useAdmin';
import useBuyer from '../Hooks/useBuyer';
import useSeller from '../Hooks/useSeller';
import NavBar from '../Shared/NavBar/NavBar';

const DashboardLayOut = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    const [isBuyer] = useBuyer(user?.email);
    const [isSeller] = useSeller(user?.email);
    return (
        <div>
            <NavBar></NavBar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">

                    <Outlet></Outlet>
                    
                </div>
                <div className="drawer-side shadow-lg">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-primary  text-white">
                        {
                            isAdmin && <>
                                <li className='bg-secondary rounded-lg font-semibold m-2'>
                                    <Link to='/dashboard/all-Buyer'>All Buyer</Link>
                                </li>
                                <li className='bg-secondary rounded-lg font-semibold m-2'>
                                    <Link to='/dashboard/all-seller'>All Seller</Link>
                                </li>
                                <li className='bg-secondary rounded-lg font-semibold m-2'>
                                    <Link to='/dashboard/reported-product'>Reported Product</Link>
                                </li>
                            </>
                        }
                        {
                            isBuyer && <>
                                <li className='bg-secondary rounded-lg font-semibold m-2'>
                                    <Link to='/dashboard/my-orders'>My Orders</Link>
                                </li>
                            </>
                        }
                        {
                            isSeller && <>
                                <li className='bg-secondary rounded-lg font-semibold m-2'>
                                    <Link to='/dashboard/my-product'>My product</Link>
                                </li>
                                <li className='bg-secondary rounded-lg font-semibold m-2'>
                                    <Link to='/dashboard/add-product'>Add Product</Link>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayOut;