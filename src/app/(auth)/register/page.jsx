'use client';

import loginUser from '@/helpers/loginUser';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

function Register() {
  const router = useRouter();

  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const { ORIGIN_URL } = process.env;

  const onSubmit = async data => {
    setIsLoading(true);
    // exclude confirmPassword
    const { confirmPassword, ...otherUserData } = data;

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(otherUserData),
    });

    const resData = await res.json();

    // is confirm password correct as original password
    if (data.password !== data.confirmPassword) {
      setIsLoading(false);
      return Swal.fire({
        title: 'Invalid Confirm Password',
        icon: 'error',
      });
    }

    if (resData) {
      const resLogin = await loginUser({
        email: data.email,
        password: data.password,
      });

      if (!resLogin && !resLogin.ok) {
        return console.log('error resLogin');
      }

      router.push('/');
    }

    // is username exists
    // is email exists
    setIsLoading(false);
  };

  return (
    <div className='relative min-h-screen w-full bg-[url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")] object-center'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='form-auth-register absolute left-1/2 top-1/2 flex min-w-[25rem] -translate-x-1/2 -translate-y-1/2 flex-col gap-5 bg-white p-7 text-black'
      >
        <h1 className='text-3xl font-light'>CREATE AN ACCOUNT</h1>
        <div className='grid md:grid-cols-2 gap-3'>
          {/* first name */}
          <input
            type='text'
            placeholder='first name'
            {...register('firstName', { required: true })}
          />
          {/* last name */}
          <input
            type='text'
            placeholder='last name'
            {...register('lastName')}
          />
          {/* username */}
          <input
            type='text'
            placeholder='username'
            {...register('username', { required: true })}
          />
          {/* email */}
          <input
            type='email'
            placeholder='email'
            {...register('email', { required: true })}
          />
          {/* password */}
          <input
            type='password'
            placeholder='password'
            {...register('password', { required: true })}
          />
          {/* confirm password */}
          <input
            type='password'
            placeholder='confirm password'
            {...register('confirmPassword', { required: true })}
          />
        </div>
        <p className='text-sm'>
          By creating an account or content to the processing of my personal
          data in accordance with the <b>PRIVACY POLICY</b>
        </p>
        <div className='flex justify-end gap-3'>
          <Link
            href='/'
            className='text-md bg-slate-300 px-5 py-2 font-semibold text-slate-600'
          >
            BACK
          </Link>
          <button
            disabled={isLoading}
            type='submit'
            className='text-md bg-teal-500 px-5 py-2 font-semibold text-white'
          >
            {isLoading ? 'Loading...' : 'SUBMIT'}
          </button>
        </div>
      </form>
    </div>
  );
}
export default Register;
