import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

const CheckOutForm = ({ booking }) => {
    console.log(booking);
    const { productPrice, productName, userName, email, _id, productId } = booking;
    console.log(productPrice);

    const [cardError, setcardError] = useState('')
    const [clientSecrete, setclientSecrete] = useState('')
    const [proccesing, setProccessing] = useState(false)
    const [success, setSuccess] = useState('')
    const [tranjactionid, setTranjactionid] = useState('')

    const stripe = useStripe()
    const elements = useElements()


    const navigate = useNavigate();


    useEffect(() => {
        fetch('https://drim-store-server-dvsrshohan.vercel.app/create-payment-intent', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ productPrice })


        })
            .then(res => res.json())
    .then(data => {

        setclientSecrete(data.clientSecrete)
    })

    }, [productPrice])




const handleSubmit = async (event) => {
    event.preventDefault()
    if (!stripe || !elements) {
        return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
        return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card
    })
    if (error) {

        setcardError(error.message)
    }
    else {
        setcardError('')
    }
    setSuccess('')
    setProccessing(true)

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
        clientSecrete,
        {
            payment_method: {
                card: card,
                billing_details: {

                    name: userName,
                    email: email,

                },

            },
        },
    );
    if (confirmError) {
        setcardError(error.message)
        return;
    }
    if (paymentIntent.status === 'succeeded') {
        const payment = {
            productPrice,
            tranjactionId: paymentIntent.id,
            email,
            bookingId: _id

        }


        fetch('https://drim-store-server-dvsrshohan.vercel.app/payment', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(payment)

        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId) {

                    handleSoldStatus(productId)
                    setSuccess('Congratulations dear you payment successfully')
                    toast.success('Congratulations dear you payment successfully')
                    setTranjactionid(paymentIntent.id)

                }
                console.log(productId);
            })
        setProccessing(false)

    }
    console.log('baki', paymentIntent)
}

const handleSoldStatus = id => {
    fetch(`https://drim-store-server-dvsrshohan.vercel.app/productSoldStatus/${id}`, {
        method: 'PUT'
        })
            .then(res => res.json())
    .then(data => {
        console.log(data)

        if (data.modifiedCount > 0) {
            toast.success('Product Sold Successful.')
        }
        navigate('/dashboard/my-orders')

    })
    }

return (
    <>
        <form onSubmit={handleSubmit}>

            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className='btn btn-primary mt-4 btn-sm' type="submit"


                disabled={!stripe || !clientSecrete || proccesing}>
                Pay
            </button>
        </form>
        <p className='text-3xl text-orange-400'>{cardError} </p>

        {
            success && <div>
                <p className='text-2xl text-green-600'>{success}</p>
                <p className='text-sm'>Tranjaction id {tranjactionid}</p>
            </div>
        }
    </>
);
};

export default CheckOutForm;