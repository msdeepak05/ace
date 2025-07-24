"use client";
import { useEffect, useState } from "react";

export default function Footer() {
  const [appName, setAppName] = useState("AceHRMS");

  useEffect(() => {
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => {
        if (data.appName) setAppName(data.appName);
      });
  }, []);

  return (
    <footer id="contact" className="w-full bg-white py-8 px-4 flex flex-col items-center border-t">
      <p className="text-indigo-400 text-sm">
        &copy; {new Date().getFullYear()} {appName}. All rights reserved.
      </p>
    </footer>
  );
}