"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { Layout } from "../components/open/Layout";
import { Dashboard } from "../lib/path";

export default function Login() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data: any) => {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const result = await res.json();
    if (!res.ok) {
      toast.error(result.error || "Login failed");
    } else {
      toast.success("Login successful!");
      setTimeout(() => router.push(Dashboard), 1500);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col justify-center items-center bg-white">
        <div className="w-full max-w-md bg-white p-8 rounded shadow">
          <h1 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Login to AceHRMS</h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
            {errors.email && <span className="text-red-600 text-sm">{errors.email.message as string}</span>}
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
            {errors.password && <span className="text-red-600 text-sm">{errors.password.message as string}</span>}
            <button
              type="submit"
              className="bg-indigo-700 text-white py-2 rounded font-semibold hover:bg-indigo-800 transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-indigo-600">
            Don't have an account?{" "}
            <Link href="/register" className="underline text-indigo-800">
              Register
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}