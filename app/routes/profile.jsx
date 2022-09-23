import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Navbar from "~/components/Navbar";
import connectDb from "~/db/connectDb.server";

export async function loader() {
  const db = await connectDb();
  const user = await db.models.User.find();
  return json(user);
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
    </div>
  );
}
