import { redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useState } from "react";
import FormField from "~/components/FormField";
import { getUser } from "~/utils/auth.server";
import { createSnippet } from "~/utils/snippet.server";

// export const loader = async ({ request }) => {
//   //TODO: redirect user if not logged in
// };

export async function action({ request }) {
  const form = await request.formData();
  // const action = form.get("_action");
  const title = form.get("title");
  const desc = form.get("desc");
  return await createSnippet({ title, desc });
}

export default function Create() {
  const actionData = useActionData();

  const [formData, setFormData] = useState({
    title: actionData?.fields?.title || "",
    desc: actionData?.fields?.desc || "",
  });

  const handleInputChange = (event, field) => {
    setFormData((form) => ({ ...form, [field]: event.target.value }));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Create</h1>
      <Form method="POST" className="rounded-2xl bg-gray-200 p-6 w-96">
        <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
          {/* {formError} */}
        </div>
        <FormField
          htmlFor="title"
          label="Title"
          value={formData.title}
          onChange={(e) => handleInputChange(e, "title")}
          // error={errors?.title}
        />
        <FormField
          htmlFor="desc"
          label="Description"
          value={formData.desc}
          onChange={(e) => handleInputChange(e, "desc")}
          // error={errors?.title}
        />
        <div className="w-full text-center">
          <button
            type="submit"
            name="_action"
            value="createSnippet"
            className="rounded-xl mt-2 bg-yellow-300 px-3 py-2 text-blue-600 font-semibold transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
          >
            Create
          </button>
        </div>
      </Form>
    </div>
  );
}
