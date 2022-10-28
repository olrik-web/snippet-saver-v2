import SyntaxHighlighter from "react-syntax-highlighter";
import { BsLightbulb, BsLightbulbFill, BsDownload, BsFiles } from "react-icons/bs";

export default function SyntaxHighlighterField({ language, code, theme, darkMode, setDarkMode, copied, setCopied }) {
  function copyToClipboard() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }

  return (
    <>
      <div className="flex flex-row justify-between my-2">
        <button type="button" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <BsLightbulbFill /> : <BsLightbulb />}
        </button>
        <button type="button" onClick={() => copyToClipboard()}>
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
