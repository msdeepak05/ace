"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { Layout } from "../components/open/Layout";

export default function Register() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data: any) => {
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const result = await res.json();
    if (!res.ok) {
      toast.error(result.error || "Registration failed");
    } else {
      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => router.push("/login"), 1500);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col justify-center items-center bg-white">
        <div className="w-full max-w-md bg-white p-8 rounded shadow">
          <h1 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Create your AceHRMS Account</h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Full Name"
              {...register("name", { required: "Name is required" })}
              className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
            {errors.name && <span className="text-red-600 text-sm">{errors.name.message as string}</span>}
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
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-indigo-600">
            Already have an account?{" "}
            <Link href="/login" className="underline text-indigo-800">
              Login
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}