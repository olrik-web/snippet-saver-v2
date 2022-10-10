import { Link, NavLink } from "@remix-run/react";
import { useState } from "react";
import logo from "../images/dall-e-elephant.png";

export default function Navbar() {
  const [clicked, setClicked] = useState(false);

  const classActive =
    "block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white";
  const classNotActive =
    "block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent";

  function handleClick() {
    setClicked(!clicked);
  }
  return (
    <nav className="fixed top-0 w-full py-2 bg-gray-900 xl:px-16">
      <Link to="/" className="flex items-center absolute top-0 left-8">
        <img className="w-16 inline-block" src={logo} alt="Logo" />
        <p className="text-xl font-semibold  dark:text-white">Snip Elephant</p>
      </Link>
      <div className="container flex justify-end items-center mx-auto flex-wrap">
        <button
          type="button"
          onClick={handleClick}
          className="inline-flex items-center p-4 md:hidden text-white overflow-hidden whitespace-nowrap"
        >
          {clicked ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" className="w-6 h-6" fill="currentColor">
              <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path>
            </svg>
          )}
        </button>
        <div
          className={
            clicked
              ? "w-full md:w-auto z-10 absolute md:static top-16 transition-all ease-in-out duration-300 left-0"
              : "w-full md:w-auto z-10 absolute md:static top-16 transition-all ease-in-out duration-300 -left-full  "
          }
        >
          <ul className="flex flex-col p-4 mt-4 bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? classActive : classNotActive)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => (isActive ? classActive : classNotActive)}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/snippets/all" className={({ isActive }) => (isActive ? classActive : classNotActive)}>
                Snippets
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" className={({ isActive }) => (isActive ? classActive : classNotActive)}>
                Profile
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
