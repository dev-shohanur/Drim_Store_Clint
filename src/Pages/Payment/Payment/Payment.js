import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { useLoaderData } from 'react-router-dom';
import CheckOutForm from '../CheckOutForm/CheckOutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK)
const Payment = () => {
        const booking = useLoaderData()
        console.log(booking)
        return (
            <div>
                <div className='w-96 my-11'>
                    <Elements stripe={stripePromise}>
                        <CheckOutForm
                            key={booking._id}
                            booking={booking}
                        />
                    </Elements>
                </div>
            </div>
        );
    };

    export default Payment;