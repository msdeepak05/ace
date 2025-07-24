import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import DashboardHeader from "./Header";
import LoadingOverlay from "../LoadingOverlay"; // Adjust path if needed

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [logo, setLogo] = useState("/next.svg");

  useEffect(() => {
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => {
        if (data.logo) setLogo(data.logo);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative flex h-screen overflow-hidden">
      {loading && <LoadingOverlay logo={logo} />}
      {/* Sidebar overlays on mobile, static on desktop */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-auto p-4 sm:p-8 bg-gray-200">{children}</main>
      </div>
    </div>
  );
}