import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import Navbar from "~/components/Navbar";
import connectDb from "~/db/connectDb.server";
import { getUser, logOut } from "~/utils/auth.server";

export async function loader() {
  const db = await connectDb();
  const user = await db.models.User.find();
  return json(user);
}

export async function action({ request }) {
  return await logOut(request);
}

export default function Profile() {
  const user = useLoaderData();

  return (
    <div>
      <Navbar />
      <h1 className="text-3xl font-bold text-center m-4">Profile</h1>
      {user.map((u) => {
        return <li key={u._id}>{u.email}</li>;
      })}
      <form  method="post">
        <button type="submit" className="button">
          Logout
        </button>
      </form>
    </div>
  );
}
