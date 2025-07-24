import { Dashboard, Settings } from "@/app/lib/path";
import { useLogout } from "@/app/lib/utility";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const logout = useLogout();
  const [appName, setAppName] = useState("AceHRMS");
  const [logo, setLogo] = useState("/next.svg");

  useEffect(() => {
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => {
        if (data.appName) setAppName(data.appName);
        if (data.logo) setLogo(data.logo);
      });
  }, []);

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden transition-opacity ${open ? "block" : "hidden"}`}
        onClick={onClose}
      />
      <aside
        className={`
          fixed z-40 top-0 left-0 h-full w-64 bg-indigo-700 text-white flex flex-col py-8 px-4
          transform transition-transform duration-200
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:block
        `}
      >
        {/* Close button for mobile */}
        <button
          className="md:hidden self-end mb-4 text-2xl"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          &times;
        </button>
        <div className="mb-8 flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-8 w-8 rounded bg-white" />
          <span className="text-2xl font-bold">{appName}</span>
        </div>
        <nav className="flex flex-col gap-4">
          <Link href={Dashboard} className="hover:bg-indigo-800 px-3 py-2 rounded transition">Dashboard</Link>
          <Link href={Settings} className="hover:bg-indigo-800 px-3 py-2 rounded transition">Settings</Link>
          <button
            onClick={logout}
            className="hover:bg-indigo-800 px-3 py-2 rounded transition text-left"
          >
            Logout
          </button>
        </nav>
      </aside>
    </>
  );
}