import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import data from "~/data.json";

export async function action({ request }) {
  const body = await request.formData();
  console.log(body);

  return null;

  // const postSnippit = await editSnippet(body);
  // return redirect(`/snippet/${postSnippit.id}`);
  return redirect("snippets/1");
}

// async function editSnippet(body) {
//   console.log(body);
//   return null;
// }

export function loader({ params, request }) {
  const snippet = data.find((snippet) => snippet.id == params.snippetId);
  return json(snippet);
}

export default function Edit() {
  const snippet = useLoaderData();

  return (
    <section>
      <article>
        <h1 className="text-3xl font-bold">Edit {snippet.title}</h1>
        <Form method="put" action={`/snippets/${snippet.id}/edit`}>
          <label>
            <input
              name="title"
              type="text"
              defaultValue={snippet ? snippet.title : undefined}
            />
          </label>
          <label>
            <textarea
              name="description"
              defaultValue={snippet ? snippet.desc : undefined}
            ></textarea>
          </label>
          <button type="submit">Update</button>
        </Form>
        <code></code>
        <Link to={`../${snippet.id}`}>Cancel</Link>
      </article>
    </section>
  );
}
