import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import Navbar from "~/components/Navbar";
import NavigationMenu from "~/components/NavigationMenu";
import connectDb from "~/db/connectDb.server";

// export const loader = async ({ request }) => {
//   //TODO: redirect user if not logged in
// };

export const loader = async () => {
  const db = await connectDb();
  const snippets = await db.models.Snippet.find();
  return json(snippets);
};

export default function Snippets() {
  const snippets = useLoaderData();
  return (
    <div>
      <NavigationMenu />
      <Navbar />
      <div className="flex ml-80 mr-4 my-4 ">
        <div>
          <h2 className="text-2xl">All snippets</h2>
          <ul>
            {snippets.map((snippet) => (
              <li key={snippet._id}>
                <Link to={snippet._id.toString()} className="text-blue-600 underline">
                  {snippet.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mx-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
