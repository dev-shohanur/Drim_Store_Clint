import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useBuyer from '../../Hooks/useBuyer';
import useToken from '../../Hooks/useToken';

const Login = () => {
    const {signIn, sinUpWithGoogle } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const [loginUserEmail, setLoginUserEmail] = useState('')
    const [userEmail,setUserEmail] = useState('')
    // const [isBuyer] = useBuyer(user?.email);

    const [token] = useToken(loginUserEmail)

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    // if (token) {
    //     navigate(from, { replace: true });
    // }


    const { register, formState: { errors }, handleSubmit } = useForm()
    const handleLogIn = data => {
        setLoginError('');
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setLoginUserEmail(data.email)
                toast.success('User Login Successfully')
                navigate(from, { replace: true });
            })
            .catch(error => {
                setLoginError(error)
            })
    }

    const { data: buyer = {}, refetch } = useQuery({
        
        queryKey: ['user', 'email'],
        queryFn: async () => {

            const res = await fetch(`https://drim-store-server-dvsrshohan.vercel.app/user?email=${userEmail}`);
            const data = await res.json();
            return data;
        }
    })
    // if (!user === {}) {
    //     console.log(user?.name);
    // } else (
    //     refetch()
    // )

    const handleSignUpWidthGoogle = () => {
        sinUpWithGoogle()
            .then(res => res)
            .then(data => {
                const user = data.user;
                setUserEmail(user.email)
                if (buyer === {}) {
                    saveUser(user.displayName, user.email, 'Buyer')
                }
                toast.success('User Login Successfully')
                navigate(from, { replace: true });
            })
    }
    const saveUser = (name, email, role) => {
        const user = { name, email, role };
        fetch('https://drim-store-server-dvsrshohan.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setLoginUserEmail(email)
            })
    }

    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='mx-auto w-96 p-6'>
                <h2 className="text-xl text-center">Log In</h2>
                <form onSubmit={handleSubmit(handleLogIn)}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email"
                            {...register("email", { required: "Email Address is required" })}
                            className="input input-bordered w-full" />
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
                            })} className="input input-bordered w-full" />
                        <label className="label">
                            <span className="label-text">Forget Password ?</span>
                        </label>
                    </div>
                    {errors.password && <p className=' text-red-600'>{errors.password?.message}</p>}

                    <input type="submit" value='Login' className='btn btn-accent w-full' />
                    <div>
                        {loginError && <p className='text-red-600'>{loginError.message}</p>}
                    </div>
                </form>
                <p className='my-3'>New to Doctors Portal?
                    <Link to='/signup' className='text-secondary'>Create new account</Link>
                </p>
                <div className="divider">OR</div>
                <button onClick={handleSignUpWidthGoogle} className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;