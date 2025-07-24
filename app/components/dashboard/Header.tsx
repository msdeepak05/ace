import { Dashboard } from "@/app/lib/path";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  return (
    <header className="w-full bg-white shadow px-8 py-4 flex items-center justify-between">
      {/* Hamburger for mobile */}
      <button
        className="md:hidden mr-4"
        onClick={onMenuClick}
        aria-label="Open sidebar"
      >
        <span className="block w-6 h-0.5 bg-indigo-700 mb-1"></span>
        <span className="block w-6 h-0.5 bg-indigo-700 mb-1"></span>
        <span className="block w-6 h-0.5 bg-indigo-700"></span>
      </button>
      <nav className="flex items-center gap-2 text-sm text-indigo-700">
        <Link href={Dashboard} className="font-bold hover:underline">Dashboard</Link>
        {paths.slice(1).map((segment, idx) => (
          <span key={idx} className="flex items-center gap-2">
            <span className="mx-1 text-gray-400">/</span>
            <span className={idx === paths.length - 2 ? "font-bold" : ""}>
              {segment.charAt(0).toUpperCase() + segment.slice(1)}
            </span>
          </span>
        ))}
      </nav>
    </header>
  );
}