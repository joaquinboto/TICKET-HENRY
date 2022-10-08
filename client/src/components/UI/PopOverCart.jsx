import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartStateSet , delCart , getCart , removeOneEventFromCart, delCartUser , checkoutCart , getCartUser} from "../../store/actions";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// TODO: Remplazar products por el estado global del carrito

export default function PopOverCart() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const cartState = useSelector((state) => state.cartState);
  const { user, cart ,summary } = useSelector((state) => state);
  const [open, setOpen] = useState(cartState);
  
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

    useEffect(() => {
      user ? dispatch(getCart(user.id)) : dispatch(getCartUser(cart))
      setOpen(cartState);
    },[dispatch, cartState , summary, user]);


    //Abro modal de carrito
  function handleClick() {
    if (open === true) {
      dispatch(cartStateSet(false));
    }
  }

  

  function handleDelete(id) {

      dispatch(delCartUser(id)) 
      dispatch(removeOneEventFromCart(id, user.id))


  }


  const checkStock = async (summary) => {
    try {
      const status = await axios.get(`/checkStock/${user.id}`)
      if(status.status === 200) {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        };
        let res = await axios.put('/payment' , {summary}, config)
        let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
        width=0,height=0,left=-1000,top=-1000`;
        window.open(res.data , 'HENRYECCOMERCE' , params)
      } 
    } catch (error) {
      toast.warning("NO HAY STOCK" , toastOptions);
    }
  }



  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleClick}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Shopping cart
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={handleClick}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                        <div className="mt-8">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {cart.length === 0 ? <p className="mt-8 text-center text-xl">Cart is empty</p> : cart.map((item) => (
                                <li key={item.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={item.image}
                                      alt={item.image}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>
                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href="#">
                                            {item.description}
                                          </a>
                                        </h3>
                                        <div className="flex flex-col">
                                          <p className="ml-4">Precio$ {(item.price)}.00</p>
                                          <p className="ml-4">Cantidad:  {user ? (item.Cart_Events.amount) : item.cantidad}</p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex  items-center justify-between ">
                                      <div>
                                        <button
                                          onClick={() => handleDelete(item.id)}
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                  </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>${summary}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          {summary === 0 || summary < 0 ? (<button
                           disabled={true}
                            onClick={() => checkStock(summary)}
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          >
                            Checkout
                          </button>) : (<button
                            onClick={() => checkStock(summary)}
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          >
                            Checkout
                          </button>) }
      
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={handleClick}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
        <ToastContainer />
    </div>
  );
}

