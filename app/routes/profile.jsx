import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Navbar from "~/components/Navbar";
import connectDb from "~/db/connectDb.server";
import { getUserId, logOut } from "~/utils/auth.server";

export async function loader({request}) {
  // Get the user that is currently logged in.
  const currentUser = await getUserId(request);
  // If the user is not logged in, redirect them to the login page.
  if (!currentUser) {
    return redirect("/login");
  }

  // TODO: Delete this and use the user from the session instead.
  const db = await connectDb();
  const user = await db.models.users.find();
  return json(user);
}

// This is the action function that will be called when the form is submitted.
export async function action({ request }) {
  return await logOut(request);
}

export default function Profile() {
  // Get the user from the loader.
  const user = useLoaderData();

  return (
    <div>
      <Navbar />
      <h1 className="text-3xl font-bold text-center m-4 mt-24">Profile</h1>
      {user.map((u) => {
        return <li key={u._id}>{u.email}</li>;
      })}
      <form method="post">
        <button
          type="submit"
          className="rounded-xl mt-2 bg-blue-600 outline outline-4 outline-blue-600 px-6 py-2 text-white font-semibold transition duration-300 ease-in-out transform hover:bg-blue-400 hover:outline-blue-400 hover:-translate-y-1"
        >
          Logout
        </button>
      </form>
    </div>
  );
}
