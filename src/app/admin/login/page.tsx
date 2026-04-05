"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { motion } from "framer-motion";
import {
  User,
  Lock,
  Loader2,
  AlertCircle,
  ChevronLeft,
  Command,
  Fingerprint,
} from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/login", { username, password });
      localStorage.setItem("token", res.data.token);
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(
        err.response?.data?.error || "Access Denied. Invalid credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white selection:bg-blue-600 selection:text-white overflow-hidden font-sans">
      {/* LEFT SIDE: Visual Branding */}
      <div className="hidden lg:flex relative bg-slate-900 p-16 flex-col justify-between overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "radial-gradient(#334155 1px, transparent 1px)",
              backgroundSize: "40px 40px", // Pakai backgroundSize, bukan size
            }}
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600 rounded-full blur-[150px]"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <Command size={24} />
          </div>
          <span className="text-2xl font-black text-white tracking-tighter">
            builtby.ikwnhanif
          </span>
        </motion.div>

        <div className="relative z-10 space-y-6">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl font-black text-white leading-tight tracking-tighter"
          >
            Management <br />
            <span className="text-blue-500">Interface.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-400 text-lg max-w-md font-medium leading-relaxed"
          >
            Sistem otorisasi terpusat untuk pengelolaan portfolio, galeri
            visual, dan konfigurasi engine builtby.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          className="relative z-10 text-[10px] font-bold text-slate-500 uppercase tracking-[0.5em]"
        >
          System Version 1.0.4-Stable
        </motion.div>
      </div>

      {/* RIGHT SIDE: Interaction Area */}
      <div className="flex items-center justify-center p-8 lg:p-24 bg-white relative">
        <div className="w-full max-w-sm space-y-12 animate-fade-in">
          {/* Header Moble (Only visible on small screens) */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
              <Command size={18} />
            </div>
            <span className="font-black text-xl tracking-tighter">
              builtby.
            </span>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => router.push("/")}
              className="group flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors text-xs font-black uppercase tracking-widest mb-6"
            >
              <ChevronLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Exit Console
            </button>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
              Administrator Login
            </h1>
            <p className="text-slate-500 font-medium">
              Identify yourself to proceed.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-600 text-sm font-bold"
              >
                <AlertCircle size={20} className="shrink-0" />
                {error}
              </motion.div>
            )}

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                  Identity
                </label>
                <div className="relative group">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors"
                    size={20}
                  />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 focus:ring-0 transition-all outline-none font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                  Access Key
                </label>
                <div className="relative group">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors"
                    size={20}
                  />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 focus:ring-0 transition-all outline-none font-medium"
                  />
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Verify Credentials <Fingerprint size={18} />
                </>
              )}
            </motion.button>
          </form>

          <div className="pt-8 text-center lg:text-left">
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em]">
              Protected by encrypted secure-layer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
