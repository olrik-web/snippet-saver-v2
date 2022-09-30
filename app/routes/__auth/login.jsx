import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import FormField from "~/components/FormField";
import { getUser, logIn, register } from "~/utils/auth.server";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "~/utils/validators.server";

// export const loader = async ({ request }) => {
//   // If there's already a user in the session, redirect to the home page
//   return (await getUser(request)) ? redirect("/") : null;
// };

export async function action({ request }) {
  const form = await request.formData();
  const action = form.get("_action");
  const email = form.get("email");
  const password = form.get("password");
  const firstName = form.get("firstName");
  const lastName = form.get("lastName");

  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
    ...(action === "register"
      ? {
          firstName: validateName(firstName || ""),
          lastName: validateName(lastName || ""),
        }
      : {}),
  };

  if (Object.values(errors).some(Boolean)) {
    return json(
      {
        errors,
        fields: { email, password, firstName, lastName },
        form: action,
      },
      { status: 400 }
    );
  }

  switch (action) {
    case "login": {
      return await logIn({ email, password });
    }
    case "register": {
      return await register({ email, password, firstName, lastName });
    }
    default:
      return json({ error: `Invalid Form Data` }, { status: 400 });
  }
}

export default function Login() {
  const [action, setAction] = useState("login");
  const actionData = useActionData();

  console.log(actionData);

  const firstLoad = useRef(true);
  const [errors, setErrors] = useState(actionData?.errors || {});
  const [formError, setFormError] = useState(actionData?.error || "");
  
  const [formData, setFormData] = useState({
    email: actionData?.fields?.email || "",
    password: actionData?.fields?.password || "",
    firstName: actionData?.fields?.lastName || "",
    lastName: actionData?.fields?.firstName || "",
  });

  const handleInputChange = (event, field) => {
    setFormData((form) => ({ ...form, [field]: event.target.value }));
  };

  useEffect(() => {
    if (!firstLoad.current) {
      const newState = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
      };
      setErrors(newState);
      setFormError("");
      setFormData(newState);
    }
  }, [action]);

  useEffect(() => {
    if (!firstLoad.current) {
      setFormError("");
    }
  }, [formData]);

  useEffect(() => {
    firstLoad.current = false;
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center m-4">Login</h1>
      <button
        onClick={() => setAction(action == "login" ? "register" : "login")}
        className="rounded-xl bg-yellow-300 font-semibold text-blue-600 px-3 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
      >
        {action === "login" ? "Sign Up" : "Sign In"}
      </button>
      <h2 className="text-5xl font-extrabold text-yellow-300">
        Welcome to Snip Elephant!
      </h2>
      <p className="font-semibold text-slate-300">
        {action === "login"
          ? "Log In To Start Snipping!"
          : "Sign Up To Get Started!"}
      </p>
      <Form method="POST" className="rounded-2xl bg-gray-200 p-6 w-96">
        <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
          {formError}
        </div>
        <FormField
          htmlFor="email"
          label="Email"
          value={formData.email}
          onChange={(e) => handleInputChange(e, "email")}
          error={errors?.email}
        />
        <FormField
          htmlFor="password"
          type="password"
          label="Password"
          value={formData.password}
          onChange={(e) => handleInputChange(e, "password")}
          error={errors?.password}
        />
        {action === "register" && (
          <>
            <FormField
              htmlFor="firstName"
              label="First Name"
              onChange={(e) => handleInputChange(e, "firstName")}
              value={formData.firstName}
              error={errors?.firstName}
            />
            <FormField
              htmlFor="lastName"
              label="Last Name"
              onChange={(e) => handleInputChange(e, "lastName")}
              value={formData.lastName}
              error={errors?.lastName}
            />
          </>
        )}
        <div className="w-full text-center">
          <button
            type="submit"
            name="_action"
            value={action}
            className="rounded-xl mt-2 bg-yellow-300 px-3 py-2 text-blue-600 font-semibold transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
          >
            {action === "login" ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </Form>
    </div>
  );
}
