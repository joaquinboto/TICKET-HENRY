import React from "react";
import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/20/solid";
import {
  userAddFavorite,
  addToCartGuest,
  addToCart,
  cartStateSet,
  userGetFavorite,
  getCart,
} from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import Favorites from "./Favorites";
import { TicketIcon } from "@heroicons/react/24/outline";

const EventCards = ({ eventos }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);

  useEffect(() => {
    user ? dispatch(userGetFavorite(user.id)) : null;
    user ? dispatch(getCart(user.id)) : null
  }, [dispatch, user]);

  const toastOptions = {
    position: "bottom-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  //Envio producto a la DB y al Carrito
  function handleSubmit(e) {
    if (user) {
      dispatch(addToCart(e.id, user.id));
      toast.success("Evento added", toastOptions);
    } else {
      toast.error("Register please", toastOptions);
    }
  }

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {eventos.map((evento) => (
        <li
          key={evento.id}
          className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
        >
          <div className="flex  items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex justify-end mb-2">
                {user ? <Favorites id={evento.id} /> : null}
              </div>
              <div className="grid justify-items-center">
                <div className="justify-center">
                  <img
                    className="h-56 w-80 flex-shrink-0 rounded bg-gray-300"
                    src={evento.image}
                    alt=""
                  />
                </div>

                {evento.artist.length < 1 ? (
                  <h3 className="mt-1 truncate text-lg font-medium text-gray-900">
                    Artist: {evento.artist[0]}
                  </h3>
                ) : (
                  <h3 className="mt-1 truncate text-lg font-medium text-gray-900">
                    Artists: {evento.artist.join(", ")}
                  </h3>
                )}
              </div>

              <div className="flex justify-around mb-3">
                <span className=" text-center rounded-lg bg-green-300 px-1.5 py-1.5 text font-medium text-green-800 mt-2">
                  STOCK: {evento.stock}
                </span>
                <span className=" text-center rounded-lg bg-purple-300 px-1.5 py-1.5 text font-medium text-purple-800 mt-2">
                  PRICE: ${evento.price}.00
                </span>
              </div>

              <div className="w-80">
                <p className="mt-1 truncate text-sm text-gray-500">
                  {evento.description}
                </p>
                <p className="mt-1  truncate text-sm text-gray-500">
                  Category: {evento.category}
                </p>
              </div>
            </div>
          </div>
          <div className="-mt-px flex divide-x divide-gray-200">
            <div className="flex w-0 flex-1">
              <Link
                to={`/private/events/${evento.id}`}
                className="bg-green-50 relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                <button>More Info</button>
              </Link>
            </div>
            <div className="-ml-px flex w-0 flex-1">
              <button
                onClick={() => handleSubmit(evento)}
                className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                <strong className="mr-3">BUY TICKET</strong>
                <TicketIcon className="w-8 h-8" />
              </button>
            </div>
          </div>
        </li>
      ))}
      <ToastContainer />
    </ul>
  );
};


export default EventCards;

