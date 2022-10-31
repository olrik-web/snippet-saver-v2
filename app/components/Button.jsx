import { useNavigate } from "@remix-run/react";

export default function Button({ type, primary, path, children }) {
  const classPrimary =
    "bg-blue-700 hover:bg-blue-900 text-white font-bold my-2 py-2 px-4 rounded-xl transition duration-300 ease-in-out transform hover:-translate-y-1";
  const classSecondary =
    "bg-slate-200 text-blue-700 hover:text-blue-900 font-bold  my-2 py-2 px-4 rounded-xl transition duration-300 ease-in-out transform hover:-translate-y-1";

  const navigate = useNavigate();
  function navigateTo() {
    navigate(path);
  }

  if (path) {
    return (
      <button onClick={navigateTo} className={primary ? classPrimary : classSecondary}>
        {children}
      </button>
    );
  }

  return (
    <button type={type} className={primary ? classPrimary : classSecondary}>
      {children}
    </button>
  );
}
