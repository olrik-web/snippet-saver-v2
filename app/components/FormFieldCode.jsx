import SyntaxHighlighterField from "./SyntaxHighlighterField";

export default function FormField({
  label,
  name,
  errors,
  defaultValue,
  handleCodeChange,
  language,
  theme,
  darkMode,
  setDarkMode,
  copied,
  setCopied,
}) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <textarea
        type="text"
        id={name}
        name={name}
        className="w-full p-2 rounded-xl my-2 text-slate-900"
        onChange={handleCodeChange}
        defaultValue={defaultValue}
        placeholder="Type your code here..."
      />
      {defaultValue && (
        <SyntaxHighlighterField
          language={language}
          code={defaultValue}
          theme={theme}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          copied={copied}
          setCopied={setCopied}
        />
      )}

      <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">{errors?.message}</div>
    </>
  );
}
