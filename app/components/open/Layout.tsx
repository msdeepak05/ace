"use client";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import LoadingOverlay from "../LoadingOverlay"; // Adjust path if needed

export const Layout = ({ children }: { children: React.ReactNode }) => {
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
    <div>
      {loading && <LoadingOverlay logo={logo} />}
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};