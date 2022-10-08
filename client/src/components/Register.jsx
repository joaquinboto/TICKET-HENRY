import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { registerAuth } from '../store/actions';

function Register() {
  const allEvents = useSelector((state) => state.events)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const reEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [error, setError] = useState({});

  function validation(input) {
    let errors = {};
    if (allEvents.find((e) => e.username === input.username)) { errors.username = "That Name exists"; }
    if (!/^[a-zA-Z0-9\s]+$/.test(input.username)) { errors.name = "Only letters and number accepted"; }
    if (input.username.length > 10) { errors.username = "Only ten characters"; }
    if (input.username === " ") { errors.username = "The first character is not space-bar"; }
    if (!input.username) { errors.username = "Name is required"; }
    if (!reEmail.test(input.email)) { errors.email = "The email isn't valid"; }
    if (!/^[a-zA-Z0-9\s]+$/.test(input.password)) { errors.password = "Only letters and number accepted"; }
    return errors;
  }

  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setError(
      validation({
        ...input,
        [e.target.name]: e.target.value
      })
    )
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!input.username) {
      return alert('Enter name')
    }
    else if (input.username.length > 10) {
      return alert('Only ten characters')
    }
    dispatch(registerAuth(input))
    setError(validation(input))
    setInput({
      username: "",
      email: "",
      password: "",
    })
    navigate('/private')
  }

  const [disabledButton, setDisabledButton] = useState(true);

  useEffect(() => {
    if (
      !input.password ||
      !reEmail.test(input.email)
    ) {
      return (setDisabledButton(true));
    } else {
      return (setDisabledButton(false));
    }
  }, [error, input, setDisabledButton])

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              className="space-y-6 mt-6"
              action="#"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    onChange={handleInputChange}
                    id="name"
                    name="username"
                    type="text"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                {error.username && (<p> ❌{error.username}</p>)}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    onChange={handleInputChange}
                    id="email"
                    name="email"
                    type="email"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                {error.email && (<p> ❌{error.email}</p>)}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    onChange={handleInputChange}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                {error.password && (<p> ❌{error.password}</p>)}
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="text-sm">
                  <a
                    href="/login"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Already have an account?
                  </a>
                </div>
                <div className="text-sm">
                  <a
                    href="/passwordRecovery"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  disabled={disabledButton}
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Register
                </button>
              </div>
            </form>

           
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;