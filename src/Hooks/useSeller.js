import React, { useEffect, useState } from 'react';

const useSeller = email => {
    const [isSeller, setIsSeller] = useState(false)
    const [isSellerLoading, setInSellerLoading] = useState(true);

    useEffect(() => {
        if (email) {
            fetch(`https://drim-store-server-dvsrshohan.vercel.app/users/seller/${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setIsSeller(data.isSeller);
                    setInSellerLoading(false)
                })
        }
    }, [email])
    return [isSeller, isSellerLoading];
};

export default useSeller;