export default function FormField({
  label,
  name,
  type,
  errors,
  element,
  children,
  defaultValue,
  handleLanguageChange,
}) {
  return (
    <>
      <label htmlFor={name} defaultValue={defaultValue}>
        {label}
      </label>
      {element == "input" ? (
        <input
          type={type}
          id={name}
          name={name}
          defaultValue={defaultValue}
          className="w-full p-2 rounded-xl my-2 text-slate-900"
        />
      ) : element == "textarea" ? (
        <textarea
          type="text"
          id={name}
          name={name}
          defaultValue={defaultValue}
          className="w-full p-2 rounded-xl my-2 text-slate-900"
        />
      ) : (
        <select
          name={name}
          id={name}
          className="w-full p-2 rounded-xl my-2 text-slate-900"
          defaultValue={defaultValue}
          onChange={handleLanguageChange}
        >
          {children}
        </select>
      )}

      <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">{errors?.message}</div>
    </>
  );
}
