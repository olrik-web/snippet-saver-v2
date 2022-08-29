import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

export const loader = async () => {
  return json({
    posts: [
      {
        slug: "my-first-snip-save",
        title: "My First Snip Save",
        desc: "",
      },
      {
        slug: "tailwind-config",
        title: "Tailwind.config.js file",
        desc: "",
      },
    ],
  });
};

export default function Snippets() {
    const { posts } = useLoaderData();
  return (
    <div>
      <h1 className="text-3xl font-bold">Snippets</h1>
      <ul>
        <li>
          <Link className="text-blue-600 underline" to="/">
            Back
          </Link>
        </li>
        <li>
          <Link className="text-blue-600 underline" to="./create">
            Create
          </Link>
        </li>
      </ul>
      <h2 className="text-2xl">All snippets</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug} className="text-blue-600 underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
