import { json, redirect, createCookieSessionStorage } from "@remix-run/node";
import { createUser } from "./user.server";
import connectDb from "~/db/connectDb.server";

// The secret is used as an extra layer of security in the cookie-based session
const { SECRET } = process.env;

// Starting the cookie-based session
const storage = createCookieSessionStorage({
  cookie: {
    name: "snipelephant-session",
    secure: process.env.NODE_ENV === "production",
    secrets: [SECRET],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: true,
  },
});

// This function is called when the user clicks signs up. A user document should be created and a cookie stored.
export async function register({ email, password, firstName, lastName }) {
  const db = await connectDb();

  // Checking if a user with the same email exist
  const userExists = await db.models.User.findOne({
    email: email,
  });

  if (userExists) {
    return json(
      { error: "User already exists with that email" },
      { status: 400 }
    );
  }

  // Creating a user document in the database
  const newUser = await createUser({ email, password, firstName, lastName });

  // Checking if we created the user
  if (!newUser) {
    return json(
      {
        error: "Something went wrong trying to create a new user.",
        fields: { email: email, password: password },
        status: 400 
      },
    );
  }

  // Getting the newly created users ID
  const user = await db.models.User.findOne({ email: email }, { _id: 1 });
  // Creating a session with user id and redirect to /snippets. We convert the OjbectId to a JSON string.
  return createUserSession(JSON.stringify(user._id), "/snippets");
}

// Function to create a session
export async function createUserSession(userId, redirectTo) {
  // 
  const session = await storage.getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

// Getting the user that is currently logged in from the database
export async function getUser(request) {
  const db = await connectDb();

  // Getting the user id
  const userId = await getUserId(request);

  if (typeof userId !== "string") {
    return null;
  }
  console.log("Trying to find user with id: " + userId);
  // Getting user info
  try {
    const user = await db.models.User.findById({ _id: userId });
    return user;
  } catch {
    // Call logout function if a user is not found
    throw logout(request);
  }
}

// This function gets a user id from the cookie session
async function getUserId(request) {
  const session = await getUserSession(request);

  // Parsing the JSON into an object
  const userId = session.get("userId");

  if (!userId || typeof userId !== "string") return null;
  // We parse the user id to remove quotation marks
  return JSON.parse(userId);
}

// This function gets the request headers cookie session
function getUserSession(request) {
  return storage.getSession(request.headers.get("Cookie"));
}

// This function is used to destroy the cookie session and redirect the user to the login page
// TODO: Call this function using a log out button
export async function logout(request) {
  const session = await getUserSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}
