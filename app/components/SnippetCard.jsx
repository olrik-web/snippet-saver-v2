import { Form, Link } from "@remix-run/react";
import { useState } from "react";
import { BsTrash, BsHeart, BsHeartFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { docco, atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import Button from "./Button";
import SyntaxHighlighterField from "./SyntaxHighlighterField";

export default function SnippetCard({ snippet, snippetFolder, details }) {
  const [darkMode, setDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const updateText = new Date(snippet.updatedAt).toUTCString();

  return (
    <div className="flex flex-col justify-between w-full p-4 my-2 bg-slate-300 rounded-lg shadow-lg">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <h2 className="text-xl font-semibold text-slate-900">{snippet.title}</h2>
          <div className="flex flex-row gap-x-4">
            <Link to={`/snippets/${snippet.snippetFolder}/${snippet._id}/edit`}>
              <FiEdit className="text-blue-500 hover:text-blue-700" />
            </Link>
            <Form method="post" action={`/snippets/${snippet.snippetFolder}/${snippet._id}/delete`}>
              <button type="submit" className="text-red-500 hover:text-red-700">
                <BsTrash />
              </button>
            </Form>
            <Form method="post" action={`/snippets/${snippet.snippetFolder}/${snippet._id}/favorite`}>
              <button type="submit" className="text-pink-400 hover:text-pink-600">
                {snippet.favorite ? <BsHeartFill /> : <BsHeart />}
              </button>
            </Form>
          </div>
        </div>
        <p className="text-sm text-slate-900">{snippet.description}</p>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <p className="text-xs text-slate-900">{snippet.language}</p>
          <p className="text-xs text-slate-900">{snippetFolder?.name}</p>
        </div>
        <SyntaxHighlighterField
          language={snippet.language}
          code={snippet.code}
          theme={darkMode ? atomOneDark : docco}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          copied={copied}
          setCopied={setCopied}
        />
        {!details && (
          <Button path={`/snippets/${snippet.snippetFolder}/${snippet._id}`} primary={true}>
            View
          </Button>
        )}
        <p className="text-xs text-slate-900">Updated at: {updateText}</p>
      </div>
    </div>
  );
}
