import SyntaxHighlighter from "react-syntax-highlighter";
import { BsLightbulb, BsLightbulbFill, BsDownload, BsFiles } from "react-icons/bs";
import { useState } from "react";

export default function SyntaxHighlighterField({ language, code, theme, darkMode, setDarkMode, copied, setCopied }) {
  return (
    <>
      <div className="flex flex-row justify-between my-2">
        <button type="button" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <BsLightbulbFill /> : <BsLightbulb />}
        </button>
        {/* Navigator.clipboard seems to be supported in many browsers, but not all: https://caniuse.com/?search=clipboard */}
        <button
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(code);
            setCopied(true);
          }}
        >
          <div className="flex flex-row gap-x-2 items-center">
            {copied ? "Copied!" : "Copy"}
            <BsFiles />
          </div>
        </button>
        <button type="button">
          <a href={`data:text/plain;charset=utf-8,${encodeURIComponent(code)}`} download="code.txt">
            <BsDownload />
          </a>
        </button>
      </div>
      <SyntaxHighlighter language={language} style={theme} showLineNumbers>
        {code}
      </SyntaxHighlighter>
    </>
  );
}
