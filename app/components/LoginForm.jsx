import { Form } from "@remix-run/react";

// This component is used on the login and signup pages.
export default function LoginForm({ errors, action }) {
  return (
    //  The action prop will be "/login" or "/signup" depending on which page the LoginForm is used on.
    <Form method="POST" action={action} className="rounded-2xl bg-gray-200 p-6 w-96">
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" className="w-full p-2 rounded-xl my-2" />
      <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
        {errors?.email?.message}
      </div>

      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" className="w-full p-2 rounded-xl my-2" />
      <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
        {errors?.password?.message}
      </div>

      {/* If the action is "/signup", show the password confirmation and first/last name fields. */}
      {action === "/signup" && (
        <>
          <label htmlFor="passwordConfirmation">Confirm Password</label>
          <input
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            className="w-full p-2 rounded-xl my-2"
          />
          <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
            {errors?.passwordConfirmation?.message}
          </div>

          <label htmlFor="firstName">First name</label>
          <input type="text" id="firstName" name="firstName" className="w-full p-2 rounded-xl my-2" />
          <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
            {errors?.firstName?.message}
          </div>

          <label htmlFor="lastName">Last name</label>
          <input type="text" id="lastName" name="lastName" className="w-full p-2 rounded-xl my-2" />
          <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
            {errors?.lastName?.message}
          </div>
        </>
      )}
      {/* The button text will be "Log In" or "Sign Up" depending on which page the LoginForm is used on. */}
      <div className="w-full text-center">
        <button
          type="submit"
          className="rounded-xl mt-2 bg-blue-600 outline outline-4 outline-blue-600 px-6 py-2 text-white font-semibold transition duration-300 ease-in-out transform hover:bg-blue-400 hover:outline-blue-400 hover:-translate-y-1"
        >
          {action === "/login" ? "Log In" : "Sign Up"}
        </button>
        {/* This error message will be displayed if something went really wrong.*/}
        <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">{errors?.error}</div>
      </div>
    </Form>
  );
}
