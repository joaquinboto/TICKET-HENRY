import { Fragment, useEffect, useState } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { userSignOut, checkStates, cartStateSet } from "../../store/actions";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../firebase/context";
import PopOverCart from "./PopOverCart";
import SearchInput from "./SearchInput";
import Logo from "../../logo/logo.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar() {
  const dispatch = useDispatch();
  const { logOut } = UserAuth();
  const { user } = useSelector((state) => state);
  const { cartState } = useSelector((state) => state);
  const [search, setSearch] = useState(false);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(userSignOut("user"));
    logOut();
    navigate("/");
  };

  const id = user ? user.id : false;

  const reset = () => {
    localStorage.clear();
  };

  const userNavigation = [
    { name: "Settings", href: `/private/user/${id}/profile`, current: true },
    { name: "Log out", href: "#", current: true },
    { name: "Dashboard", href: "/admindashboard" },
  ];

  function handleCartClick() {
    if (cartState === false) {
      dispatch(cartStateSet(true));
    } else {
      dispatch(cartStateSet(false));
    }
  }

  function handleSearchClick(e) {
    e.preventDefault();
    search === false ? setSearch(true) : setSearch(false);
  }

  useEffect(() => {
    dispatch(checkStates());
  }, [dispatch, user, cartState]);

  return (
    <>
      <PopOverCart />
      {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
      <Popover
        as="header"
        className={({ open }) =>
          classNames(
            open ? "fixed inset-0 z-40 overflow-y-auto" : "",
            "bg-white shadow-sm lg:static lg:overflow-y-visible"
          )
        }
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
                <div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
                  <div className="flex flex-shrink-0 items-center">
                    <a href="/">
                      <img
                        className="block h-16 w-auto"
                        src={Logo}
                        alt="Your Company"
                      />
                    </a>
                  </div>
                </div>
                <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                  <div className="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
                    <div className="w-full">
                      <label htmlFor="search" className="sr-only">
                        Search
                      </label>

                      <button
                        onClick={(e) => handleSearchClick(e)}
                        type="button"
                        className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Buscar...
                      </button>
                      {search === true ? <SearchInput /> : null}
                    </div>
                  </div>
                </div>
                <div className="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
                  {/* Mobile menu button */}

                  <Popover.Button className="-mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Popover.Button>
                </div>
                <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
                  <Link
                    to={"/events"}
                    className="items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Events
                  </Link>
                  <a
                    onClick={handleCartClick}
                    href="#"
                    className="ml-5 flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">View notifications</span>
                    <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                  </a>
                  {user ? (
                    <Menu as="div" className="relative ml-5 flex-shrink-0">
                      <div>
                        <Menu.Button className="flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="sr-only">Open user menu</span>
                          {user ? (
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user.profile_picture}
                              alt=""
                            />
                          ) : (
                            <>
                              <button>Login</button>
                            </>
                          )}
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={handleClick}
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block py-2 px-4 text-sm text-gray-700"
                                )}
                              >
                                Logout
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                onClick={() => null}
                                href={`/private/user/${id}/profile`}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block py-2 px-4 text-sm text-gray-700"
                                )}
                              >
                                Settings
                              </a>
                            )}
                          </Menu.Item>
                          {user.status === "Admin" ? (
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                onClick={() => null}
                                href="/private/createvent"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block py-2 px-4 text-sm text-gray-700"
                                )}
                              >
                                New Event
                              </a>
                            )}
                          </Menu.Item>) : null }
                          {user.status === "Admin" ? (
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  onClick={() => null}
                                  href="/admindashboard"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block py-2 px-4 text-sm text-gray-700"
                                  )}
                                >
                                  Admin Dashboard
                                </a>
                              )}
                            </Menu.Item>
                          ) : null}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <div className="flex justify-center">
                      <div>
                        <Link
                          onClick={() => reset()}
                          to={"/login"}
                          className="ml-6 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Login
                        </Link>
                      </div>
                      <div>
                        <Link
                          onClick={() => reset()}
                          to={"/register"}
                          className="ml-6 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Sig In
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
              <div className="border-t border-gray-200 pt-4 pb-3">
                <div className="mx-auto flex max-w-3xl items-center px-4 sm:px-6">
                  <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" alt="" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {/* {usuario.name} */}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {/* {usuario.email} */}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">View notifications</span>
                    <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4">
                  {userNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </>
  );
}

export default Navbar;
