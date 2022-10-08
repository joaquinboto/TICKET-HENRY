import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAuth, checkStates } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { GoogleButton } from 'react-google-button';
import { UserAuth } from '../firebase/context';
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GithubButton from 'react-github-login-button'
import Logo from "../logo/logo.png";

function Login() {

  const toastOptions = {
		position: "bottom-center",
		autoClose: 1000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "dark"
		};

  const { googleSignIn , user , gitHubSignIn } = UserAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user)


  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(checkStates())
    if (user != null || token != null) {
      navigate('/')
    }

  }, [user, token]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  }

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await gitHubSignIn()
    } catch (error) {
      console.log(error)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(loginAuth(input));
    setInput({
      email: "",
      password: "",
    });

    if(user) {
      navigate("/") 
    } else {
      toast.error('password or email not valid' , toastOptions);
      setInput({
        email: "",
        password: "",
      });
    }

  }

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <a href="/">
            <img
              className="mx-auto h-24 w-auto"
              src={Logo}
              alt="Your Company"
            />
          </a>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
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
                  autoComplete="email"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
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
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a
                  href="/register"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Don't have an account?
                </a>
              </div>

              <div className="text-sm">
                <a
                  href="/passwordRecovery"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                onClick={(e) => handleSubmit(e)}
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Login
              </button>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="flex justify-around w-96">
                <div>
                  <GoogleButton onClick={handleGoogleSignIn} />
                </div>
                <div className="mx-5">
                  <GithubButton onClick={handleGithubSignIn} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
}

export default Login;