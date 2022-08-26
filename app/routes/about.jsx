import { Link } from "@remix-run/react";

export default function About() {
  return (
    <div>
      <h1>About me</h1>
      <ul>
        <li>
          <Link to="/">Back</Link>
        </li>
      </ul>
    </div>
  );
}
