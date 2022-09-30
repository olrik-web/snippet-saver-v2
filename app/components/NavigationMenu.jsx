import { Link } from "@remix-run/react";

export default function NavigationMenu() {
  return (
    <nav className="fixed w-72 h-full top-20 left-0 overflow-x-hidden text-center dark:bg-gray-900 text-white">
      <ul>
        <li className="mx-8 my-4 py-3 bg-yellow-400 rounded-xl text-black">
          <Link to="./create">New snippet</Link>
        </li>
        <li className="pt-8">
          <Link to="./">All snippets</Link>
        </li>
      </ul>
      <ul>
        <li className="pt-8">
          <Link to="/">Front page</Link>
        </li>
      </ul>
    </nav>
  );
}
