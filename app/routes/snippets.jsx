import { Outlet } from "@remix-run/react";
import Navbar from "~/components/Navbar";
import NavigationMenu from "~/components/NavigationMenu";

export default function Snippets() {
  return (
    <div>
      <NavigationMenu />
      <Navbar />
      <div className="ml-80 mr-4 my-4">
        <Outlet />
      </div>
    </div>
  );
}
