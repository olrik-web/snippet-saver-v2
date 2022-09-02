import { Outlet } from "@remix-run/react";
import Navbar from "~/components/Navbar";

export default function Auth() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
