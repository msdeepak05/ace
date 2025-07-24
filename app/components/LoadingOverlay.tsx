"use client";
import { useEffect, useState } from "react";

export default function LoadingOverlay({ logo }: { logo: string }) {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white bg-opacity-80">
      <img src={logo} alt="Logo" className="h-16 w-16 mb-4 animate-bounce" />
      <div className="w-8 h-8 border-4 border-indigo-700 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}