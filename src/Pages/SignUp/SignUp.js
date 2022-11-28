import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider.js';
import useToken from '../../Hooks/useToken.js';

const SignUp = () => {
    const { createUser, updateUser, sinUpWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loginError, setLoginError] = useState('')
    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [token] = useToken(createdUserEmail)

    // if (token) {
    //     navigate('/')
    // }

    console.log('aaa', loginError);
    const handleSignUp = data => {
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                const userInfo = {
                    displayName: data.name
                }
                toast.success('User Created Successfully')
                console.log(data.name);
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email, data.role);
                        navigate('/')
                    })
                    .catch(err => setLoginError(err))
            })
            .catch(error => setLoginError(error))
    }

    const handleSignUpWidthGoogle = () => {
        sinUpWithGoogle()
            .then(res => res)
            .then(data => {
                const user = data.user;
                saveUser(user.displayName, user.email,'Buyer')
        })
    }
    const saveUser = (name, email,role) => {
        const user = { name, email,role };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUserEmail(email)
            })
    }
    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='mx-auto w-96 p-6'>
                <h2 className="text-xl text-center">Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text"
                            {...register("name", {
                                required: "Name is required",
                                maxLength: { value: 20, message: 'Your Name Use Max 20 characters' }
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
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email"
                            {...register("email", {
                                required: "Email Address is required"
                            })}
                            className="input input-bordered w-full" />
                        <label className="label">
                            <span className="label-text">
                                {errors.email && <p className=' text-red-600'>{errors.email?.message}</p>}
                            </span>
                        </label>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Role</span>
                        </label>
                        <select
                            {...register("role")}
                            className="select select-bordered w-full">
                            <option selected>Buyer</option>
                            <option>Seller</option>
                        </select>
                        <label className="label">
                            <span className="label-text">
                                {errors.email && <p className=' text-red-600'>{errors.email?.message}</p>}
                            </span>
                        </label>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: 'Password must be 6 characters or longer' },
                                pattern:
                                {
                                    value: /(?=.*[a-z])(?=.*[A-Z]).{6,}/i,
                                    message: 'Password must be Strong'
                                }
                            })} className="input input-bordered w-full" />
                        <label className="label">
                            <span className="label-text">Forget Password ?</span>
                        </label>
                    </div>
                    {errors.password && <p className=' text-red-600'>{errors.password?.message}</p>}

                    <input type="submit" value='Sign Up' className='btn btn-accent w-full' />
                    <div className="label">
                        <span className="label-text text-red-600">
                            {loginError && <p className=' text-red-600'>{loginError.message}</p>}
                        </span>
                    </div>
                </form>
                <p className='my-3'>already have an account?
                    <Link to='/login' className='text-secondary'>Log In</Link>
                </p>
                <div className="divider">OR</div>
                <button onClick={handleSignUpWidthGoogle} className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default SignUp;