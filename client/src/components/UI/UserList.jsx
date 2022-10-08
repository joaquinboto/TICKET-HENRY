import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getUsers , upgradeToAdmin , upgradeToUser , bannedToUser , unBanned, checkStates} from '../../store/actions'

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function UserList() {
  const dispatch = useDispatch()

  const {currentUsers} = useSelector((state) => state)

  useEffect(() => {
    dispatch(getUsers())
  },[dispatch ])

  const upgradeAdmin = (id) => {
    dispatch(upgradeToAdmin(id))
  }

  const upgradeUser = (id) => {
    dispatch(upgradeToUser(id))
  }

  const bannedUser = (id) => {
    dispatch(bannedToUser(id))
  }

  const unban = (id) => {
    dispatch(unBanned(id))
  }


  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title,
            email and role.
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
                      Name
                    </th>
                   
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
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
                  {currentUsers.map((person) => (
                    <tr key={person.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={person.profile_picture}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              {person.username}
                            </div>
                            <div className="text-gray-500">{person.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                          {person.status}
                        </span>
                      </td>
                      <td>
                        { person.status === 'User' ? 
                        (<button className="mx-2 bg-black p-2 rounded-5 text-white" onClick={() => upgradeUser(person.id)}>
                          Admin
                        </button>) : 
                        (<button className="mx-2 bg-black p-2 rounded-5 text-white" onClick={()=> upgradeAdmin(person.id)}>
                          User
                        </button>)
                        }
                        {person.status === 'Banned' ? (
                          <button className="mx-2 bg-black p-2 rounded-5 text-white" onClick={() => unban(person.id)}>
                            Desban
                          </button>
                        ): (
                          <button className="mx-2 bg-black p-2 rounded-5 text-red-800" onClick={() => bannedUser(person.id)}>
                            Ban
                          </button>
                        )}
                      </td>
                      {/* <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Switch key={person.id}
                          checked={enabled}
                          onChange={setEnabled}
                          className={classNames(
                            enabled ? "bg-indigo-600" : "bg-gray-200",
                            "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          )}
                        >
                          <span className="sr-only">Use setting</span>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              enabled ? "translate-x-5" : "translate-x-0",
                              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                            )}
                          />
                        </Switch>
                      </td> */}
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

export default UserList;
