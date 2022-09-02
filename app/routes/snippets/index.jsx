import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

export const loader = async () => {
  return json({
    snippets: [
      {
        id: 1,
        title: "My First Snip Save",
        desc: "",
      },
      {
        id: 2,
        title: "Tailwind.config.js file",
        desc: "",
      },
    ],
  });
};

export default function Index() {
  const { snippets } = useLoaderData();
  return (
    <div>
      <h2 className="text-2xl">All snippets</h2>
      <ul>
        {snippets.map((snip) => {
          console.log(snip.id);
          return (
            <li key={snip.id}>
              <Link to={snip.id} className="text-blue-600 underline">
                {snip.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
