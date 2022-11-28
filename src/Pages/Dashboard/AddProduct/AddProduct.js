import { useQuery } from '@tanstack/react-query';
import { logDOM } from '@testing-library/react';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';

const AddProduct = () => {
    const {user} = useContext(AuthContext)
    const navigate = useNavigate();
    const [productImg,setProductImg] = useState('')
    const { register, formState: { errors }, handleSubmit } = useForm();


    const { data: categoryTitles = [] } = useQuery({
        queryKey: ['categoryTitle'],
        queryFn: async () => {

            const res = await fetch('http://localhost:5000/categoryTitles');
            const data = await res.json();
            return data;
        }
    })

    const imageHostKey = process.env.REACT_APP_imgbb_key;


    const date = new Date().toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" });
    const handleAddProduct = data => {
 
        const image = data.productImage[0];
        const formData = new FormData();
        formData.append('image', image)
        console.log(formData);
        const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    setProductImg(imgData.data.url);
                }
                setProductImg(imgData.data.url);
            })
        if (productImg !== '') {
            addProduct(
                productImg,
                data.productName,
                data.originalPrice,
                data.productPrice,
                data.condition,
                data.category,
                data.yearOfPurchase,
                data.mobilNumber,
                data.location,
                data.description,
                date,
                user.email,
            ); 
        }
    }

    console.log(productImg);

    const addProduct = (
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
    ) => {
        const product = {
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
            email,
            soldStatus: 'unsold'
        };
        fetch('http://localhost:5000/dashboard/addproduct', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                navigate('/dashboard/my-product')
                toast.success('Product Add Successfully')
            })
    }
    // console.log(productImg.);
    console.log();
    return (
        <div className=''>
            <div className=' w-96 p-6'>
                <h2 className="text-2xl font-bold">Add Product</h2>
                <form onSubmit={handleSubmit(handleAddProduct)}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Product Image</span>
                        </label>
                        <input type="file"
                            {...register("productImage", {
                                required: "Product Image is required"
                            })}
                            className="file-input file-input-bordered  file-input-secondary w-full" />
                        <label className="label">
                            <span className="label-text">
                                {errors.name && <p className=' text-red-600'>{errors.name?.message}</p>}
                            </span>
                        </label>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Product Name</span>
                        </label>
                        <input type="text"
                            {...register("productName", {
                                required: "Product Name is required"
                            })}
                            className="input input-bordered w-full" />
                        <label className="label">
                            <span className="label-text">
                                {errors.name && <p className=' text-red-600'>{errors.name?.message}</p>}
                            </span>
                        </label>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Original Price</span>
                        </label>
                        <input type="text"
                            {...register("originalPrice", {
                                required: "Original Price is required"
                            })}
                            className="input input-bordered w-full" />
                        <label className="label">
                            <span className="label-text">
                                {errors.name && <p className=' text-red-600'>{errors.name?.message}</p>}
                            </span>
                        </label>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Product Price</span>
                        </label>
                        <input type="text"
                            {...register("productPrice", {
                                required: "Product Price is required"
                            })}
                            className="input input-bordered w-full" />
                        <label className="label">
                            <span className="label-text">
                                {errors.name && <p className=' text-red-600'>{errors.name?.message}</p>}
                            </span>
                        </label>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Product Category</span>
                        </label>
                        <select
                            {...register("category")}
                            className="select select-bordered w-full">
                            <option selected disabled>Select Category</option>
                            {
                                categoryTitles.map(categoryTitle =>
                                    <option value={categoryTitle._id}>{categoryTitle.title}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Product Condition</span>
                        </label>
                        <select
                            {...register("condition")}
                            className="select select-bordered w-full">
                            <option selected value={`excellent`}>Excellent</option>
                            <option value={`good`}>Good</option>
                            <option value={`fair`}>Fair</option>
                        </select>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Year of Purchase</span>
                        </label>
                        <input type="date"
                            {...register("yearOfPurchase", {
                                required: "Year of Purchase is required"
                            })}
                            className="input input-bordered w-full" />
                        <label className="label">
                            <span className="label-text">
                                {errors.name && <p className=' text-red-600'>{errors.name?.message}</p>}
                            </span>
                        </label>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Mobile Number</span>
                        </label>
                        <input type="text"
                            {...register("mobilNumber", {
                                required: "Mobil Number is required"
                            })}
                            className="input input-bordered w-full" />
                        <label className="label">
                            <span className="label-text">
                                {errors.name && <p className=' text-red-600'>{errors.name?.message}</p>}
                            </span>
                        </label>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Location</span>
                        </label>
                        <textarea type="text"
                            {...register("location", {
                                required: "Location is required"
                            })}
                            className="textarea textarea-bordered w-full" />
                        <label className="label">
                            <span className="label-text">
                                {errors.name && <p className=' text-red-600'>{errors.name?.message}</p>}
                            </span>
                        </label>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea type="text"
                            {...register("description", {
                                required: "Description is required"
                            })}
                            className="textarea textarea-bordered w-full" />
                        <label className="label">
                            <span className="label-text">
                                {errors.name && <p className=' text-red-600'>{errors.name?.message}</p>}
                            </span>
                        </label>
                    </div>



                    <input type="submit" value='Add Product' className='btn btn-accent w-full' />
                </form>
            </div>
        </div>
    );
};

export default AddProduct;