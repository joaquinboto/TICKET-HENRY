import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowLeftOnRectangleIcon,
  Bars3BottomLeftIcon,
  Cog6ToothIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Logo from "../../logo/logo.png";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllEvents,
  userSignOut,
  userGetFavorite,
  changePassword,
  editProfile,
  removeUsuario
} from "../../store/actions";
import { UserAuth } from "../../firebase/context";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import InsertPhoto from "../../assets/yourimage.png";
import { useNavigate } from "react-router-dom";
const navigation = [{ name: "Settings", icon: Cog6ToothIcon, current: false }];
const secondaryNavigation = [
  { name: "Logout", href: "/", icon: ArrowLeftOnRectangleIcon },
];
const tabs = [{ name: "General", href: "#", current: true }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logOut } = UserAuth();
  const { user } = useSelector((state) => state);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [active, setActive] = useState(0);
  const usuario = JSON.parse(localStorage.user);
  const favoritos = usuario.favorites;
  const eventos = useSelector((state) => state.events);
  const [datos, setDatos] = useState({
    profile_picture: "",
    profile_picture_id: "",
    username: "",
  });
  const [showPwd, setShowPwd] = useState(false);

  const changePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const sendPassword = () => {
    if (password.length <= 0) {
      alert("Please enter a password");
    } else {
      dispatch(changePassword(user.id, password));
    }
  };

  useEffect(() => {
    dispatch(getAllEvents());
    user ? dispatch(userGetFavorite(user.id)) : null;
  }, [dispatch, user]);

  async function handleFile(e) {
    e.preventDefault();
    let profile_picture = e.target.files[0];
    let data = new FormData();
    data.append("file", profile_picture);
    data.append("upload_preset", "pkokipva");
    fetch("https://api.cloudinary.com/v1_1/dzjonhhps/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setDatos({
          ...datos,
          profile_picture: res.secure_url,
          profile_picture_id: res.public_id,
        });
      });
  }

  function recArr(el, arr) {
    for (let i = 0; i < arr.length; i++) {
      if (el === arr[i]) return true;
    }
  }

  const eventsFavourites = eventos.filter((el) => recArr(el.id, favoritos));
  
  function handleChange(e) {
    setDatos({
      ...datos,
      username: e.target.value,
    });
  }

  function handleUpdate(e) {
    e.preventDefault();
    dispatch(editProfile(user.id, datos));
    alert("Your profile change success!");
    navigate("/")
  }

  const deleteAcc = (e) => {
    e.preventDefault()
    dispatch(removeUsuario(user.id , {status: 'Banned'}));
    dispatch(userSignOut('user'))
    logOut()

    }

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-14 p-1">
                      <button
                        type="button"
                        className="flex h-12 w-12 items-center justify-center rounded-full focus:bg-gray-600 focus:outline-none"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Close sidebar</span>
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex flex-shrink-0 items-center px-4">
                    <a href="/">
                      <img
                        className="mx-auto h-24 w-auto"
                        src={Logo}
                        alt="Your Company"
                      />
                    </a>
                  </div>
                  <div className="mt-5 h-0 flex-1 overflow-y-auto">
                    <nav className="flex h-full flex-col">
                      <div className="space-y-1">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-purple-50 border-purple-600 text-purple-600"
                                : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                              "group border-l-4 py-2 px-3 flex items-center text-base font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? "text-purple-500"
                                  : "text-gray-400 group-hover:text-gray-500",
                                "mr-4 flex-shrink-0 h-6 w-6"
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        ))}
                      </div>
                      <div className="mt-auto space-y-1 pt-10">
                        {secondaryNavigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="group flex items-center border-l-4 border-transparent py-2 px-3 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          >
                            <item.icon
                              className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <nav className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-gray-50 pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <a href="/">
                <img
                  className="mx-auto h-24 w-auto"
                  src={Logo}
                  alt="Your Company"
                />
              </a>
            </div>
            <div className="mt-5 flex-grow">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-purple-50 border-purple-600 text-purple-600"
                        : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                      "group border-l-4 py-2 px-3 flex items-center text-sm font-medium"
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-purple-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "mr-3 flex-shrink-0 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
            <div className="block w-full flex-shrink-0">
              {secondaryNavigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="group flex items-center border-l-4 border-transparent py-2 px-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <item.icon
                    className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              ))}
            </div>
          </nav>
        </div>

        {/* Content area */}
        <div className="md:pl-64">
          <div className="mx-auto flex max-w-4xl flex-col md:px-8 xl:px-0">
            <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white">
              <button
                type="button"
                className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <main className="flex-1">
              <div className="relative mx-auto max-w-4xl md:px-8 xl:px-0">
                <div className="pt-10 pb-16">
                  <div className="px-4 sm:px-6 md:px-0">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                      Settings
                    </h1>
                  </div>
                  <div className="px-4 sm:px-6 md:px-0">
                    <div className="py-6">
                      {/* Tabs */}
                      <div className="lg:hidden">
                        <label htmlFor="selected-tab" className="sr-only">
                          Select a tab
                        </label>
                        <select
                          id="selected-tab"
                          name="selected-tab"
                          className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                          defaultValue={tabs.find((tab) => tab.current).name}
                        >
                          {tabs.map((tab) => (
                            <option key={tab.name}>{tab.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="hidden lg:block">
                        <div className="border-b border-gray-200">
                          <nav className="-mb-px flex space-x-8">
                            {tabs.map((tab) => (
                              <a
                                key={tab.name}
                                href={tab.href}
                                className={classNames(
                                  tab.current
                                    ? "border-purple-500 text-purple-600"
                                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                                  "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                                )}
                              >
                                {tab.name}
                              </a>
                            ))}
                          </nav>
                        </div>
                      </div>

                      {/* Description list with inline editing */}
                      <div className="mt-10 divide-y divide-gray-200">
                        <div className="space-y-1">
                          <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Perfil
                          </h3>
                          <p className="max-w-2xl text-sm text-gray-500">
                            Configuracion de datos del perfil.
                          </p>
                        </div>
                        <div className="mt-6">
                          <dl className="divide-y divide-gray-200">
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                              <dt className="text-sm font-medium text-gray-500">
                                Name:
                              </dt>
                              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <input
                                  onChange={(e) => handleChange(e)}
                                  type="text"
                                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                />
                                <span className="ml-4 flex-shrink-0"></span>
                              </dd>
                            </div>
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                              <dt className="text-sm font-medium text-gray-500">
                                Photo:
                              </dt>
                              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <span className="flex-grow">
                                  <img
                                    className="h-20 w-20 rounded-full"
                                    alt=""
                                    src={
                                      !datos.profile_picture
                                        ? { InsertPhoto }
                                        : datos.profile_picture
                                    }
                                  />
                                </span>
                                <span className="ml-4 flex flex-shrink-0 items-center space-x-4">
                                  <input
                                    onChange={handleFile}
                                    type="file"
                                    accept="image/*"
                                    className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                  />
                                  <span className="ml-4 flex-shrink-0"></span>
                                </span>
                              </dd>
                            </div>
                            <div>
                              <h2 className="text-sm font-medium text-gray-500">
                                Favoritos:
                              </h2>
                              <ul
                                role="list"
                                className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 "
                              >
                                {eventsFavourites.map((project) => (
                                  <li
                                    key={project.description}
                                    className="col-span-2 flex rounded-md shadow-sm "
                                  >
                                    <div
                                      className={classNames(                                 
                                        "flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md pl-1"
                                      )}
                                    >
                                      <img 
                                        src={project.image}
                                      />
                                    </div>
                                    <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white">
                                      <div className="flex-1 truncate px-4 py-2 text-sm ">
                                        <a
                                          href={`/private/events/${project.id}`}
                                          className="font-medium text-gray-900 hover:text-gray-600"
                                        >
                                          {project.description}
                                        </a>
                                        <p className="text-gray-500 ">
                                          {project.place}
                                        </p>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <form>
                              <div className="flex items-center">
                                <h1 className="text-sm mr-2 font-medium text-gray-500">
                                  Reset password:
                                </h1>
                                <input
                                  onChange={(e) => changePasswordInput(e)}
                                  type={showPwd ? "text" : "password"}
                                  className="mt-2 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                />
                                <div onClick={() => setShowPwd(!showPwd)}>
                                  {showPwd ? (
                                    <EyeIcon
                                      type="button"
                                      className="h-6 w-6 ml-2"
                                    />
                                  ) : (
                                    <EyeSlashIcon
                                      type="button"
                                      className="h-6 w-6 ml-2"
                                    />
                                  )}
                                </div>
                                <button
                                  onClick={(e) => sendPassword(e)}
                                  type="button"
                                  className=" ml-5 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                >
                                  Change Password
                                </button>
                              </div>
                            </form>
                          </dl>
                          <button
                            onClick={(e) => handleUpdate(e)}
                            type="button"
                            className="mt-5 mr-5 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          >
                            Update
                          </button>
                          <button
                            onClick={(e) => deleteAcc(e)}
                            className=" mt-8 text-white appearance-none bg-red-800 rounded-md border border-white px-3 py-2 placeholder-white shadow-sm focus:border-red-500 focus:outline-none focus:ring-indigo-500 sm:text-sm hover:bg-red-400 hover:text-gray-500"
                          >
                            Delete Account
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
