import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../../store/actions";

function Stats() {
  const dispatch = useDispatch();
  const allEvents = useSelector((state) => state.events)

  const [stock, setStock] = useState(0)

  useEffect(() => {
    dispatch(getAllEvents())
  }, [dispatch])

function sumaStock(e){

}

  return (
    <div className="bg-gray-50 pt-12 sm:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Servicio de Calidad.
          </h2>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            Contamos con los mejores eventos compuesto por especialistas.
          </p>
        </div>
      </div>
      <div className="mt-10 bg-white pb-12 sm:pb-16">
        <div className="relative">
          <div className="absolute inset-0 h-1/2 bg-gray-50" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                  <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
                    Boletos vendidos
                  </dt>
                  <dd className="order-1 text-5xl font-bold tracking-tight text-indigo-600">
                    10489
                  </dd>
                </div>
                <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                  <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
                    Eventos
                  </dt>
                  <dd className="order-1 text-5xl font-bold tracking-tight text-indigo-600">
                    310+
                  </dd>
                </div>
                <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                  <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
                    Boletos disponibles
                  </dt>
                  <dd className="order-1 text-5xl font-bold tracking-tight text-indigo-600">
                    89178
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
