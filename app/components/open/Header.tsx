import { Login, OpenHome, Register } from "@/app/lib/path";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center px-8 py-6 bg-white shadow-sm">
    <div className="flex items-center gap-2">
      <Link href={OpenHome}>
        <Image src="/next.svg" alt="Next.js Logo" width={40} height={40} />
      </Link>
    </div>
    <nav className="flex gap-8 text-indigo-700 font-medium">
        <Link href={Login} className="hover:underline">Login</Link>
        <Link href={Register} className="hover:underline">Register</Link>
    </nav>
    </header>
  );
}