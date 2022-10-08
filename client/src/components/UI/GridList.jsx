/* This example requires Tailwind CSS v2.0+ */
import {
  DocumentTextIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { deleteEventById } from "../../store/actions";

function GridList({ eventos }) {
  const dispatch = useDispatch();

  function handleDelete(id) {
    dispatch(deleteEventById(id));
  }

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {eventos.map((event) => (
        <li
          key={event.id}
          className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
        >
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="truncate text-sm font-medium text-gray-900">
                  {event.artist}
                </h3>
                <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                  {event.stock}
                </span>
              </div>
              <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                {event.price}
              </span>
              <p className="mt-1 truncate text-sm text-gray-500">
                {event.description}
              </p>
              <p className="mt-1 truncate text-sm text-gray-500">
                {event.category}
              </p>
            </div>
            <img
              className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
              src={event.image}
              alt=""
            />
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <a
                  onClick={() => handleDelete(event.id)}
                  href="#"
                  className="bg-red-600 relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  <XMarkIcon
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                  <span className="ml-3 text-white">Delete</span>
                </a>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <a
                  href={`/admindashboard/${event.id}`}
                  className="bg-blue-200 relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  <DocumentTextIcon
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                  <span className="ml-3 text-white">Edit</span>
                </a>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default GridList;
