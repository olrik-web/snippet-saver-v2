import { json, redirect } from "@remix-run/node";
import { Link, useActionData } from "@remix-run/react";
import LoginForm from "~/components/LoginForm";
import { getUser, signup } from "~/utils/auth.server";

// This is the action function that will be called when the form is submitted.
export async function action({ request }) {
  // Get the email, password, passwordConfirmation, firstName, and lastName from the request body.
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");
  const passwordConfirmation = form.get("passwordConfirmation");
  const firstName = form.get("firstName");
  const lastName = form.get("lastName");

  // Try to sign up the user and return the result. If it fails, return the error(s).
  try {
    return await signup(email, password, passwordConfirmation, firstName, lastName);
  } catch (error) {
    return json(error);
  }
}

export async function loader({ request }) {
  // If the user is already logged in, redirect them to the home page.
  return (await getUser(request)) ? redirect("/profile") : null;
}

export default function SignUp() {
  // Get the actionData from the action function.
  const actionData = useActionData();

  // If the actionData is an error, pass it to the LoginForm component.
  return (
    <>
      <h1 className="text-3xl font-bold text-center m-4 mt-24">Sign Up</h1>
      <div className="flex flex-col justify-center items-center py-8">
        <LoginForm errors={actionData} action="/signup" />
        <div className="text-center">
          <p className="px-4">or</p>
          <button className="rounded-xl mt-2 outline outline-blue-400 px-6 py-2 text-black font-semibold transition duration-300 ease-in-out transform hover:outline-blue-200 hover:-translate-y-1">
            <Link to="/login">Log in</Link>
          </button>
        </div>
      </div>
    </>
  );
}
