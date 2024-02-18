import React from "react";
import Navbar from "../Fragment/Navbar";
import Footer from "../Fragment/Footer";

export default function Layout({ children }) {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">{children}</div>
      <Footer />
    </div>
  );
}
