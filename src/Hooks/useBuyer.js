import React, { useEffect, useState } from 'react';

const useBuyer = email => {
    const [isBuyer, setIsBuyer] = useState(false)
    const [isBuyerLoading, setInBuyerLoading] = useState(true);

    useEffect(() => {
        if (email) {
            fetch(`https://drim-store-server-dvsrshohan.vercel.app/users/buyer/${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setIsBuyer(data.isBuyer);
                    setInBuyerLoading(false)
                })
        }
    }, [email])
    return [isBuyer, isBuyerLoading];
};

export default useBuyer;