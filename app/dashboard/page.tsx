"use client";
import React from 'react'
import { useRouter } from "next/navigation";
import { Login } from '../lib/path';
import DashboardLayout from '../components/dashboard/Layout';

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = () => {
    router.push(Login);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-indigo-700 text-white px-6 py-2 rounded font-semibold hover:bg-indigo-800 transition"
        >
          Logout
        </button>
      </div>
    </DashboardLayout>
  );
}