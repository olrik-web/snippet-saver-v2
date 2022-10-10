import { redirect } from "@remix-run/node";
import { Link, useActionData } from "@remix-run/react";
import LoginForm from "~/components/LoginForm";
import { getUser, logIn } from "~/utils/auth.server";

export async function loader({ request }) {
  // If the user is already logged in, redirect them to the home page.
  return (await getUser(request)) ? redirect("/profile") : null;
}

export default function Login() {
  // Get the actionData from the action function.
  const actionData = useActionData();

  // If the actionData is an error, pass it to the LoginForm component.
  return (
    <>
      <h1 className="text-3xl font-bold text-center m-4 mt-24">Log In</h1>
      <div className="flex flex-col justify-center items-center py-8">
        <LoginForm errors={actionData} action="/login" />
        <div className="text-center">
          <p className="px-4">or</p>
          <button className="rounded-xl mt-2 outline outline-blue-400 px-6 py-2 text-black font-semibold transition duration-300 ease-in-out transform hover:outline-blue-200 hover:-translate-y-1">
            <Link to="/signup">Sign up</Link>
          </button>
        </div>
      </div>
    </>
  );
}

// This is the action function that will be called when the form is submitted.
export async function action({ request }) {
  // Get the email and password from the request body.
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");

  // Log in the user and return the response.
  return await logIn(email, password);
}

export function ErrorBoundary({error}) {
  return (
    <div className="text-red-500 text-center">
      <h1 className="text-2xl font-bold">Error</h1>
      <p>{error.message}</p>
    </div>
  )
}