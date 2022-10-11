import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getStats } from '../../store/actions'

function StatsDashboard({ user, eventos }) {
  const {stats} = useSelector((state) => state)
  const statss = [
    { name: "Boletos Vendidos Total", stat: stats.soldTickets },
    { name: "Eventos Activos", stat: eventos.length },
    { name: "Total de stock" , stat: stats.allStock}
  ];

  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(getStats())
  },[dispatch])

  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-900">
        Bienvenido {user.username}
      </h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {statss.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <dt className="truncate text-sm font-medium text-gray-500">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {item.stat}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default StatsDashboard;
