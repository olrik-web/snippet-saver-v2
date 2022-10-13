import { Link } from "@remix-run/react";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";

export default function SnippetCard({ snippet, snippetFolder }) {
  return (
    <div className="flex flex-col justify-between w-full p-4 my-2 bg-slate-300 rounded-lg shadow-lg">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <h2 className="text-xl font-semibold text-slate-900">{snippet.title}</h2>
          <div className="flex flex-row gap-x-4">
            <Link to={`/snippets/${snippet.snippetFolder}/${snippet._id}/edit`}>
              <FiEdit className="text-blue-500 hover:text-blue-700" />
            </Link>
            <Link to={`/snippets/${snippet.snippetFolder}/${snippet._id}/delete`}>
              <BsTrash className="text-red-500 hover:text-red-700" />
            </Link>
          </div>
        </div>
        <p className="text-sm text-slate-900">{snippet.description}</p>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <p className="text-xs text-slate-900">{snippet.language}</p>
          <p className="text-xs text-slate-900">{snippetFolder?.name}</p>
        </div>
        <SyntaxHighlighter language={snippet.language} style={docco}>
          {snippet.code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
