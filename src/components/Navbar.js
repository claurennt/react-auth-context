import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuthContext } from "../context/AuthContext";
import { removeFromLocalStorage } from "../utils/auth";
import NavbarLink from "./Elements/NavbarLink";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser, setAuthToken, authToken } = useAuthContext();
  console.log(user);
  const handleLogout = (e) => {
    e.preventDefault();
    removeFromLocalStorage();

    setAuthToken(null);
    setUser({
      username: "",
      password: "",
      email: "",
      profile_pic: null,
    });
    navigate("/", { replace: true });
  };

  return (
    <Disclosure as="nav" className="bg-gray-800 m-auto">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4"></div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                ></button>
                {/* Profile dropdown */}
                <div className="flex space-x-4">
                  {!authToken && <NavbarLink path="signup" text="Sign Up" />}

                  {authToken && user.profile_pic ? (
                    <button onClick={handleLogout}>Logout</button>
                  ) : (
                    <NavbarLink path="login" text="Login" />
                  )}
                </div>

                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      {authToken && user.profile_pic ? (
                        <img
                          className="h-10 w-10 rounded-full"
                          src={user.profile_pic}
                          alt=""
                        />
                      ) : (
                        <div className="rounded-full bg-slate-200 h-10 w-10 animate-pulse"></div>
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
                    <Menu.Items className="absolute h-31 right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white  py-3 shadow-lg ring-1 gap-y-4 flex flex-col ring-black ring-opacity-5 text-black focus:outline-none">
                      <Menu.Item>
                        {({ active }) => <Link to="profile">Your Profile</Link>}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => <Link to="settings">Settings</Link>}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => <a href="#">Sign out</a>}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {/* {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))} */}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
