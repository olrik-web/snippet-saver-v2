import { Link, useParams } from "@remix-run/react";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

export default function SnippetCard({ snippet }) {
  return (
    <div className="flex flex-col justify-between w-full p-4 my-2 bg-slate-300 rounded-lg shadow-lg">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold text-center">{snippet.title}</h2>
        <code className="text-center">{snippet.desc}</code>
      </div>
      <div className="flex flex-row justify-between">
        <Link className="text-blue-600" to={`/snippets/${snippet.snippetFolder}/${snippet._id}/edit`}>
          <FiEdit />
        </Link>
        <Link className="text-red-600" to={`/snippets/${snippet.snippetFolder}/${snippet._id}/delete`}>
          <BsTrash />
        </Link>
      </div>
    </div>
  );
}
