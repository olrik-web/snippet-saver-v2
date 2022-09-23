import bcrypt from "bcryptjs";
import connectDb from "~/db/connectDb.server";

// This function creates a user document in the database
export async function createUser({ email, password, firstName, lastName }) {
  const db = await connectDb();

  // Hashing the password using salt
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  // Creating the user document
  const newUser = await db.models.User.create({
    email: email,
    password: hashPassword,
    profile: {
      firstName: firstName,
      lastName: lastName,
    },
  });
  return newUser;
}
