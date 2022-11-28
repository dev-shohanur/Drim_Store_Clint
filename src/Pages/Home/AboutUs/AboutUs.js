import React from 'react';

const AboutUs = () => {
    return (
        <div>
            <h3 className=" text-center mt-5 text-3xl font-bold">About US</h3>
            <div className="bg-secondary h-1 w-1/6 mx-auto"></div>
            <div className="set container mt-5 grid grid-cols-1 sm:grid-cols-2">

                <div>
                    <img
                        className="mt-5 ml-5 ml-5 rounded shadow-lg  w-full"
                        src="https://img.freepik.com/free-photo/documents-paperwork-business-strategy-concept_53876-124266.jpg?size=626&ext=jpg&uid=R75315196&ga=GA1.2.1721658491.1666825315&semt=ais"

                        alt=""
                        data-aos="fade-right" data-aos-duration="2000"
                    ></img>
                </div>
                <p className="m-5 pt-5 ml-8" data-aos="fade-left" data-aos-duration="2000">
                    RE-COMMERCE is the combination of first ever e-commerce and re-commerce
                    marketplace in Bangladesh where customers can purchase anything by
                    personalized orders as well as sell their unneeded/surplus products
                    such as smartphones, laptops, appliances, vehicles, etc. and exchange
                    also.
                </p>
            </div>
            <div className="sun container  mt-5 grid grid-cols-1 sm:grid-cols-2" style={{ marginTop: "120px", marginBottom: '100px' }}>
                <div>
                    <p className="m-5 pt-5" data-aos="fade-right" data-aos-duration="2000">
                        RE-COMMERCE arranges personalized orders for customers and delivers at
                        their door steps. Hence, customers need not to worry about buying
                        daily groceries or shopping some high-end gadgets, etc. RE-COMMERCE works
                        as one-stop solution for its valuable customers whether it is about
                        buying, selling or exchanging with whatever products they want.
                    </p>
                </div>

                <div>
                    <img
                        className="mt-5 ml-5 mr-5 rounded shadow-lg  w-full"
                        // src="https://img.freepik.com/premium-psd/cyber-monday-sale-composition-mock-up_23-2148659811.jpg?size=626&ext=jpg&uid=R75315196&ga=GA1.2.1721658491.1666825315&semt=sph"
                        src="https://t3.ftcdn.net/jpg/02/42/12/52/240_F_242125288_UbvRaEsTDGw1tEkRDYf0tW6uTwXftnKD.jpg"
                        alt=""
                        data-aos="fade-left" data-aos-duration="2000"
                    ></img>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;