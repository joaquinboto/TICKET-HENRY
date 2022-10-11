import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPastOrders } from "../../store/actions";
import Table from 'react-bootstrap/Table';

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
            <Table striped bordered hover>
      <thead>
        <tr>
          <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">ID</th>
          <th className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">Status</th>
          <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Evento</th>
          <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Description</th>
          <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Tickets</th>
          <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Price</th>
          <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Artitas</th>
          <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Total</th>
        </tr>
      </thead>
      <tbody>
          {pastOrders?.map((e) => (
            <tr key={e.id}>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{e.id}</td>
              <td className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"> <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800"> {e.status} </span> </td>
              {e.events ? e.events.map((e) => (
                <>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><img width={"100px"} src={e.image} alt="" /></td>
                 <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{e.description}</td>
                 <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{e.Cart_Events.amount}</td>
                 <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${e.price}</td>
                 <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{e.artist ? e.artist.map(artist => artist) : null}</td>
                </>
              )): null }
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${e.totalPrice}</td>
            </tr>
          ))}
          
      </tbody>
    </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PastOrders;
