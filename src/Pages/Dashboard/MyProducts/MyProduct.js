import React from 'react';

const MyProduct = ({ myProduct }) => {
    const {
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

    } = myProduct;
    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Product Img</th>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Sold Status</th>
                        <th>Advatis</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>1</th>
                        <td>Cy Ganderton</td>
                        <td>Quality Control Specialist</td>
                        <td>Blue</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default MyProduct;