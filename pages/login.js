import React from 'react'
//import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if(localStorage.getItem("token")){
      router.push("/")
    }
  
  }, [])
  

  const handleChange = (e)=>{
  if(e.target.name == "email"){
      setEmail(e.target.value)
    }
    else if(e.target.name == "password"){
      setPassword(e.target.value)
    }
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const data = { email, password}

    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(data)
    })
    let response = await res.json()
    setEmail('')
    setPassword('')
    if(response.success){
      localStorage.setItem('token', response.token)
      toast.success('You have been logged in.', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        setTimeout(() => {
          router.push('/')
        }, 1000);
        
    }
    else{
      toast.error(response.error, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }


  }
  return (
    <>
    <ToastContainer
      position="bottom-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div className="w-full max-w-md space-y-8">
    <div>
    <img class="mx-auto h-12 w-auto" src="/better new 400x100.png" alt="betterkarts.com"/>
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">LOG IN</h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        Or
        <Link href={'/signup'}><a href="#" className="font-medium text-pink-600 hover:text-pink-500">SIGN UP</a></Link>
      </p>
    </div>
    <form onSubmit={handleSubmit} className="mt-8 space-y-6" method="POST">
      
      <div className="-space-y-px rounded-md shadow-sm">
        <div>
          <label htmlFor="email" className="sr-only">Email address</label>
          <input value={email} onChange={handleChange} id="email" name="email" type="email" autocomplete="email" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm" placeholder="Email address"/>
        </div>
        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <input value={password} onChange={handleChange} id="password" name="password" type="password" autocomplete="current-password" required className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm" placeholder="Password"/>
        </div>
      </div>

      <div className="flex items-center justify-end">


        <div className="text-sm">
          <Link href={'/forgot'}><a href="#" className="font-medium text-pink-600 hover:text-pink-500">Forgot your password?</a></Link>
        </div>
      </div>

      <div>
        <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-pink-600 py-2 px-4 text-sm font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
           
            <svg className="h-5 w-5 text-pink-500 group-hover:text-pink-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
            </svg>
          </span>
          LOG IN
        </button>
      </div>
    </form>
  </div>
</div>
    </>
  )
}

export default Login