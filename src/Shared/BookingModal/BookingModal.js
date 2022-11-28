import { React, useContext } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';


const BookingModal = ({ booking, setBooking }) => {

    const navigate = useNavigate()

    const { _id,productImg, productName, productPrice, } = booking;

    const { user } = useContext(AuthContext)

    const handleSubmitForm = event => {
        console.log(event)
        event.preventDefault()
        const form = event.target
        const user_location = form.location.value;
        const user_phone = form.phone.value;
        console.log(user_location, user_phone)

        const booking = {
            productImg: productImg,
            userName: user?.displayName,
            email: user?.email,
            productPrice: productPrice,
            user_location,
            user_phone,
            productName: productName,
            productId: _id,

        }
        console.log(booking)

        fetch('https://drim-store-server-dvsrshohan.vercel.app/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)

        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    setBooking(null)

                    toast.success('congratulations you are successfully booking ')
                    navigate('/dashboard/my-product')

                    // handleSoldStatus(_id)



                }
                else {
                    toast.error(data.message)
                }

                console.log(data)
            })

    }


    const handleSoldStatus = id => {
        fetch(`https://drim-store-server-dvsrshohan.vercel.app/product/${id}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)

                if (data.modifiedCount > 0) {
                    toast.success('Product Sold Successful.')
                }

            })
    }



    return (

        <>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-2xl font-bold text-center">Book {productName} cheap price </h3>

                        <img src={productImg} alt="" srcset="" />

                    <form onSubmit={handleSubmitForm}>

                        <input type="text" name='name' defaultValue={user?.displayName} readOnly placeholder="name" className="input w-full mt-10   input-bordered " />

                        <input type="text" name='productName' readOnly defaultValue={productName} placeholder="name" className="input w-full mt-10   input-bordered " />

                        <input type="email" name='email' defaultValue={user?.email} readOnly disabled placeholder="email" className="input w-full mt-10   input-bordered " />

                        <input type="number" name='price' readOnly
                            defaultValue={productPrice}
                            placeholder="price" className="input w-full mt-10  input-bordered " />



                        <input type="text" name='phone' placeholder="your phone number" className="input w-full mt-10   input-bordered " />

                        <input type="text" name='location' placeholder="your location " className="input w-full mt-10   input-bordered " />



                        <input className='w-full btn  btn-primary rounded mt-10' type="submit" value="submit" />
                    </form>
                </div>
            </div></>
    );
};

export default BookingModal;