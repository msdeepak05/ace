"use client";
import { Login, OpenHome, Register } from "@/app/lib/path";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
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
    <header className="w-full flex justify-between items-center px-8 py-6 bg-white shadow-sm">
      <div className="flex items-center gap-2">
        <Link href={OpenHome} className="flex items-center gap-2">
          <Image src={logo} alt="Logo" width={40} height={40} />
          <span className="text-xl font-bold text-indigo-700">{appName}</span>
        </Link>
      </div>
      <nav className="flex gap-8 text-indigo-700 font-medium">
        <Link href={Login} className="hover:underline">Login</Link>
        <Link href={Register} className="hover:underline">Register</Link>
      </nav>
    </header>
  );
}