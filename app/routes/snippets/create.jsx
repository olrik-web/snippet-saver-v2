import { json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import SnippetForm from "~/components/SnippetForm";
import { getUser } from "~/utils/auth.server";
import { createSnippet } from "~/utils/snippet.server";

export async function action({ request }) {
  const form = await request.formData();
  const title = form.get("title");
  const desc = form.get("desc");
  try {
    return await createSnippet({ title, desc });
  } catch (error) {
    return json(error);
  }
}

export async function loader({ request }) {
  // If the user is not logged in, redirect them to the login page.
  return (await !getUser(request)) ? redirect("/login") : null;
}

export default function Create() {
  const actionData = useActionData();

  return (
    <div>
      <h4 className="text-2xl font-bold text-center">New Snippet</h4>
      <SnippetForm errors={actionData} action="/create" />
    </div>
  );
}
