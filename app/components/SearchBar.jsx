import { NavLink } from "@remix-run/react";
import { BsPlusCircleFill } from "react-icons/bs";

export default function SearchBar({ setSearchTerm, disabled }) {
  const classActive =
    "block p-3 rounded-lg text-lg font-bold text-center text-white bg-blue-700 transition duration-300 ease-in-out";
  const classNotActive =
    "block p-3 rounded-lg text-lg font-bold text-center text-white bg-blue-500 hover:bg-blue-700 hover:text-white transition duration-300 ease-in-out";

  return (
    <div className="flex flex-row items-center justify-center w-full">
      <input
        className="w-full p-2 my-2 mx-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
        name="name"
        type="text"
        placeholder="Search"
        onChange={(e) => setSearchTerm(e.target.value)}
        disabled={disabled}
      />
      <NavLink to="./create" className={({ isActive }) => (isActive ? classActive : classNotActive)}>
        <div className="flex flex-row items-center whitespace-nowrap gap-x-4">
          <p className="text-sm">New Snippet</p>
          <BsPlusCircleFill />
        </div>
      </NavLink>
    </div>
  );
}
