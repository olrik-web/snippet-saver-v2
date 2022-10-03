import { Form } from "@remix-run/react";

// This component is used on the login and signup pages.
export default function SnippetForm({ errors, action }) {
  return (
    //  The action prop will be "/login" or "/signup" depending on which page the LoginForm is used on.
    <Form method="POST" action={action} className="rounded-2xl bg-gray-200 p-6 w-96">
      <label htmlFor="title">Title</label>
      <input type="text" id="title" name="title" className="w-full p-2 rounded-xl my-2" />
      <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
        {errors?.title?.message}
      </div>

      <label htmlFor="desc">Description</label>
      <textarea type="text" id="desc" name="desc" className="w-full p-2 rounded-xl my-2" />
      <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">{errors?.desc?.message}</div>
      {/* The button text will be "Log In" or "Sign Up" depending on which page the LoginForm is used on. */}
      <div className="w-full text-center">
        <button
          type="submit"
          className="rounded-xl mt-2 bg-blue-600 outline outline-4 outline-blue-600 px-6 py-2 text-white font-semibold transition duration-300 ease-in-out transform hover:bg-blue-400 hover:outline-blue-400 hover:-translate-y-1"
        >
          Save
        </button>
        {/* This error message will be displayed if something went really wrong.*/}
        <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">{errors?.error}</div>
      </div>
    </Form>
  );
}
