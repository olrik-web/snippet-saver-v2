import { useParams } from "@remix-run/react";

export default function Details() {
  const {snippetId} = useParams();
  return (
    <section>
      <h1 className="text-3xl font-bold">Details page {snippetId}</h1>
      <code>
        
      </code>
    </section>
  );
}
