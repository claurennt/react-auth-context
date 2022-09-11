import React from 'react';
import { Navigate } from 'react-router-dom';
const SignUp = ({
  isAuthenticated,
  handleChange,
  handleRegister,
  user: { username, password, email },
}) => {
  console.log(isAuthenticated);
  isAuthenticated && <Navigate to='/secret' replace />;
  return (
    <div className='bg-grey-lighter min-h-screen flex flex-col'>
      <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
          <h1 className='mb-8 text-3xl text-center'>Sign up</h1>

          <div className='mx-auto w-64 text-center '>
            <div className='relative w-64'>
              <div className='w-64 h-64 group bg-blue-100 hover:bg-blue-200 opacity-60 rounded-full flex justify-center items-center cursor-pointer transition duration-500'>
                <img
                  className='w-12'
                  src='https://www.svgrepo.com/show/33565/upload.svg'
                  alt=''
                />
              </div>
            </div>
          </div>
          <input
            type='text'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='username'
            placeholder='Username'
            value={username}
            onChange={handleChange}
          />

          <input
            type='text'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='email'
            placeholder='Email'
            value={email}
            onChange={handleChange}
          />

          <input
            type='password'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='password'
            placeholder='Password'
            value={password}
            onChange={handleChange}
          />

          <button
            onClick={handleRegister}
            type='submit'
            className='w-full text-center py-3 rounded bg-green text-black hover:bg-green-dark focus:outline-none my-1'
          >
            Create Account
          </button>
        </div>

        <div className='text-grey-dark mt-6'>
          Already have an account?
          <a
            className='no-underline border-b border-blue text-blue'
            href='../login/'
          >
            Log in
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default SignUp;
