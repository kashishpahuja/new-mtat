"use client";

import { useState } from "react";
import { apiRequest } from "../../lib/adminApi";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");

    try {
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      localStorage.setItem("mtat_admin_token", data.token);
      location.href = "/admin";
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className=" w-full bg-[#eef1f6] flex items-center justify-center font-sans">

      <div className="flex w-full min-h-[calc(100vh-24px)] sm:min-h-[calc(100vh-40px)] lg:min-h-[calc(100vh-64px)] overflow-hidden bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)]">

        {/* Left Side - Login Form */}
        <section className="flex w-full lg:w-1/2 flex-col justify-center px-6 py-12 sm:px-12 lg:px-14 xl:px-20">

          <div className="mx-auto w-full max-w-md">

            {/* Heading */}
            <div className="mb-10 text-center">
              <h1 className="mb-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#1e1e1e]">
                Hello Again!
              </h1>

              <p className="text-xs sm:text-sm tracking-wide text-gray-500">
                Let&apos;s get started with your admin portal
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={submit} className="flex flex-col gap-4">

              <div className="flex flex-col gap-4">

                <input
                  required
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-[#f9fafb] px-4 py-4 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-[#7e575c] focus:bg-white focus:ring-2 focus:ring-[#7e575c]/10"
                />

                <input
                  required
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-[#f9fafb] px-4 py-4 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-[#7e575c] focus:bg-white focus:ring-2 focus:ring-[#7e575c]/10"
                />

                <div className="flex justify-end -mt-1">
                  <a
                    href="#recovery"
                    className="text-xs text-gray-400 transition-colors hover:text-[#7e575c]"
                  >
                    Recovery Password
                  </a>
                </div>

              </div>

              {error && (
                <p className="rounded-lg bg-red-50 px-4 py-3 text-center text-sm text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={busy}
                className="mt-2 w-full rounded-lg bg-[#053c7a] px-4 py-4 text-sm font-semibold text-white shadow-lg shadow-[#7e575c]/20 transition-all duration-300 hover:bg-[#031b36] hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {busy ? "Signing in..." : "Sign In"}
              </button>

            </form>
          </div>
        </section>

        {/* Right Side - Image Panel */}
        <section className="relative m-3 ml-0 hidden w-1/2 overflow-hidden rounded-[20px] lg:block">

          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85')",
            }}
          />

          {/* Image Overlay */}
          <div className="absolute inset-0 flex items-end rounded-[20px] bg-gradient-to-t from-black/50 via-black/10 to-transparent p-8 xl:p-12">

            <p className="max-w-sm text-lg font-medium leading-relaxed text-white drop-shadow-md xl:text-xl">
              Finally, all your work in one place.
            </p>

          </div>
        </section>

      </div>
    </main>
  );
}
