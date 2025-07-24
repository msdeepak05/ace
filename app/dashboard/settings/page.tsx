"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/Layout";
import { toast } from "react-toastify";

export default function SettingsPage() {
  const { register, handleSubmit, setValue, watch, formState: { isSubmitting } } = useForm();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Fetch current app name and logo on mount
  useEffect(() => {
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => {
        if (data.appName) setValue("appName", data.appName);
        if (data.logo) setLogoPreview(data.logo);
      });
  }, [setValue]);

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("appName", data.appName);
    if (data.logo && data.logo[0]) {
      formData.append("logo", data.logo[0]);
    }
    const res = await fetch("/api/settings", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const result = await res.json();
      toast.success("Settings saved!");
      setLogoPreview(result.logo);
    } else {
      toast.error("Failed to save settings");
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full min-h-[calc(100vh-64px)] flex items-center justify-center px-2 py-8">
        <div className="w-full max-w-lg bg-white p-4 sm:p-8 rounded shadow">
          <h1 className="text-2xl font-bold mb-4">Settings</h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <label className="font-semibold">App Name</label>
            <input
              type="text"
              {...register("appName", { required: true })}
              className="border rounded px-4 py-2"
              placeholder="Enter app name"
            />

            <label className="font-semibold">App Logo</label>
            <input
              type="file"
              accept="image/*"
              {...register("logo")}
              onChange={handleLogoChange}
              className="border rounded px-4 py-2"
            />
            {logoPreview && (
              <img src={logoPreview} alt="Logo Preview" className="h-16 mt-2" />
            )}

            <button
              type="submit"
              className="bg-indigo-700 text-white py-2 rounded font-semibold hover:bg-indigo-800 transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Settings"}
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}