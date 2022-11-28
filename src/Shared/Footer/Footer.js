import React from 'react';
import { FaEnvelope, FaFacebook, FaGithub, FaInstagram, FaLocationArrow, FaPhone } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className=" p-10 bg-primary text-white">
            <div className="footer">
                <div>
                    <Link to='/' className="text-3xl">Drim Store</Link>
                    <p className="text-xl font-semibold flex items-center">
                        <FaLocationArrow  className='mr-2'/>
                         Bagatipara, Natore , Bangladesh
                    </p>
                    <p className="text-xl font-semibold flex items-center">
                        <FaEnvelope className='mr-2' />
                         info@dremstore.com
                    </p>
                    <p className="text-xl font-semibold flex items-center">
                        <FaPhone className='mr-2' />
                         +880 1324 127931
                    </p>
                </div>
                <div>
                    <Link to='/'
                        className="link link-hover text-xl">
                        Home
                    </Link>
                    <Link to='/blog'
                        className="link link-hover text-xl">
                        Blog
                    </Link>
                    <Link to='/dashboard'
                        className="link link-hover text-xl">
                        Dashboard
                    </Link>
                    <div className="flex">
                        <a href='https://facebook.com' target='blank'
                            className="link link-hover text-xl mr-2">
                            <FaFacebook />
                        </a>
                        <a href='https://instagram.com' target='blank'
                            className="link link-hover text-xl mr-2">
                            <FaInstagram />
                        </a>
                        <a href='https://github.com' target='blank'
                            className="link link-hover text-xl mr-2">
                            <FaGithub />
                        </a>
                    </div>
                </div>
                <div>
                    <img className='w-full' src="https://web.programming-hero.com/static/media/ssl-commerce.1d268dce.png" alt="" />
                </div>
            </div>
            <div className='text-center mt-32 text-xl'>
                <p>Copyright © 2022 - All right reserved by Drim Store</p>
            </div>
        </footer>
    );
};

export default Footer;