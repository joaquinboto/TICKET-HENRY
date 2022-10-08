import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPastOrders } from "../../store/actions";

function PastOrders({ user }) {
  const people = [
    {
      name: "Lindsay Walton",
      title: "Front-end Developer",
      department: "Optimization",
      email: "lindsay.walton@example.com",
      role: "Member",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    // More people...
  ];
  const dispatch = useDispatch();
  const {pastOrders} = useSelector((state) => state);
    

  useEffect(() => {
    dispatch(getPastOrders(user.id));
  }, [dispatch]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Past Orders</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the past orders in your account.
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Event Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Tickets
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Total
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {pastOrders?.map((order) => (
                    <tr key={order.id}>
                    <th>CARRITO CON EL ID: {order.id}</th>
                    <th className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                         STATUS: {order.status}
                      </th>
                      {order.events.map((event) => (
                        <tr key={event.id}>
                           <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                           <div className="flex items-center">
                             <div className="h-10 w-10 flex-shrink-0">
                               <img
                                 className="h-10 w-10 rounded-full"
                                 src={event.image || null}
                                 alt=""
                               />
                             </div>
                             <div className="ml-4">
                               <div className="font-medium text-gray-900">
                                 PRECIO DEL PRODUCTO: ${event.price}
                               </div>
                               {/* <div className="text-gray-500">{order.email}</div> */}
                             </div>
                           </div>
                         </td>
                         <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                         Cantidad: {event.Cart_Events.amount}
                         </td>
                         <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                           DETALLE DEL EVENTO: {event.description}
                         </td>
                         <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                           ARTISTAS: {event.artist ? event.artist.map(artist => artist) : null}
                         </td>
                          </tr>
                      ))}
                      </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PastOrders;
