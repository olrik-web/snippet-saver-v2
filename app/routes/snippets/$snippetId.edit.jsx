import { redirect } from "@remix-run/node";
import { Link, useParams } from "@remix-run/react";

// export async function action({ request }) {
//   const body = await request.formData();
//   const project = await editSnippet(body);
//   return redirect(`/snippet/${snippetIds}`);
// }

export default function Edit() {
  const { snippetId } = useParams();

  return (
    <section>
      <article>
        <h1 className="text-3xl font-bold">Edit page {snippetId}</h1>
        <form method="post" action="/snippets">
          <label>
            <input name="title" type="text" />
          </label>
          <label>
            <textarea name="description"></textarea>
          </label>
          <button type="submit">Create</button>
        </form>
        <code></code>
        <Link to={`../${snippetId}`}>Cancel</Link>
      </article>
    </section>
  );
}

