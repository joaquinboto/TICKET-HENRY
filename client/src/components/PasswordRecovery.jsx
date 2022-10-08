import React, { useState } from 'react'
import Navbar from './UI/Navbar'

import { LockClosedIcon } from '@heroicons/react/20/solid'
import { sendEmailPassword } from '../store/actions'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'



const PasswordRecovery = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toastOptions = {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark"
};

  const [email, setEmail] = useState("")

  function onChange(e) {
    e.preventDefault()
    setEmail(e.target.value)
  }


  function handleSubmit(e) {
    if(email) {
    e.preventDefault()
    console.log("este es el email", email)
    dispatch(sendEmailPassword({email: email}))
    console.log("Despachar")
    setTimeout(() => {
      navigate("/");
  }, 4000)
  toast.success("Revisa tu bandeja de entrada", toastOptions);
    } else {
      toast.error("Ingresa un correo registrado", toastOptions)
    }
  }

  
console.log(email)




  return (
    <div>
    <Navbar />

    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Reestablecer Contraseña
            </h2>
            
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  onChange={(e) => onChange(e)}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Correo registrado"
                />
              </div>
             
            </div>

           
            <div>
              <button onClick={(e) => handleSubmit(e)}
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Enviar correo de Reestablecimiento
              </button>
            </div>
          </form>
        </div>
      </div>
    
    </div>
  )
}

export default PasswordRecovery