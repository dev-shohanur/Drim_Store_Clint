import React from 'react';
import AboutUs from '../AboutUs/AboutUs';
import Advertise from '../Advertise/Advertise';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';

const Home = () => {
    return (
        <div>

            <Banner></Banner>
            <Category></Category>
            <Advertise></Advertise>
            <AboutUs></AboutUs>
            
        </div>
    );
};

export default Home;