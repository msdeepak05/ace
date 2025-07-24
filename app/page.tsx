import { FaMoneyCheckAlt, FaUserCheck, FaUserPlus } from "react-icons/fa";
import Header from "./components/open/Header";
import Footer from "./components/open/Footer";
import Link from "next/link";
import { Login } from "./lib/path";

export default function Home() {
  return (
    <div className="font-sans min-h-screen flex flex-col items-center justify-between bg-white p-0">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center text-center py-4 px-4 mt-0">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-800 mb-4 mt-0">
          Outsource Your HR, Focus On Your Business
        </h1>
        <p className="text-lg sm:text-xl text-indigo-700 mb-8 max-w-2xl">
          AceHRMS is a modern, cloud-based Human Resource Management System that streamlines payroll, attendance, recruitment, and more—so you can focus on what matters most.
        </p>
        <Link
          href={Login}
          className="inline-block bg-indigo-700 text-white px-8 py-3 rounded-full font-semibold text-lg shadow hover:bg-indigo-800 transition mb-8"
        >
          Get Started
        </Link>
      </main>

      <section id="features" className="w-full bg-white py-16 px-4">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-8">Features</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <FaMoneyCheckAlt className="mx-auto mb-2 text-indigo-700" size={48} />
            <h3 className="font-semibold text-indigo-800 mb-1">Automated Payroll</h3>
            <p className="text-indigo-600 text-sm">Error-free, on-time salary processing every month.</p>
          </div>
          <div>
            <FaUserCheck className="mx-auto mb-2 text-indigo-700" size={48} />
            <h3 className="font-semibold text-indigo-800 mb-1">Attendance Tracking</h3>
            <p className="text-indigo-600 text-sm">Track employee attendance and leave with ease.</p>
          </div>
          <div>
            <FaUserPlus className="mx-auto mb-2 text-indigo-700" size={48} />
            <h3 className="font-semibold text-indigo-800 mb-1">Recruitment</h3>
            <p className="text-indigo-600 text-sm">Simplify hiring with our integrated recruitment tools.</p>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}