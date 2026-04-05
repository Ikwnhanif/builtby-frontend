"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api, getImageUrl } from "@/lib/api";
import { Profile, Project } from "@/types";
import { motion } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  LogOut,
  LayoutDashboard,
  UserCircle,
  Briefcase,
  Camera,
  ExternalLink,
  ChevronRight,
  Settings,
  Image as ImageIcon,
} from "lucide-react";

export default function AdminDashboard() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [galleryCount, setGalleryCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [profRes, projRes, gallRes] = await Promise.all([
        api.get("/profile"),
        api.get("/projects"),
        api.get("/gallery"),
      ]);
      setProfile(profRes.data);
      setProjects(projRes.data);
      setGalleryCount(Array.isArray(gallRes.data) ? gallRes.data.length : 0);
    } catch (err) {
      console.error("Gagal mengambil data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin/login");
  };

  const deleteProject = async (id: number) => {
    if (confirm("Yakin ingin menghapus project ini?")) {
      try {
        await api.delete(`/projects/${id}`);
        fetchData();
      } catch (err) {
        alert("Gagal menghapus project");
      }
    }
  };

  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#F8FAFC]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans selection:bg-blue-600 selection:text-white text-slate-900">
      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r border-slate-200 p-8 hidden lg:flex flex-col justify-between sticky top-0 h-screen">
        <div>
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-xl shadow-slate-200">
              B
            </div>
            <span className="font-black text-2xl tracking-tighter">
              builtby.
            </span>
          </div>

          <nav className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm shadow-lg shadow-slate-200 transition-all">
              <LayoutDashboard size={18} /> Dashboard
            </button>
            <button
              onClick={() => router.push("/admin/dashboard/gallery")}
              className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-2xl font-bold text-sm transition-all"
            >
              <Camera size={18} /> Visual Gallery
            </button>
            <button
              onClick={() => window.open("/", "_blank")}
              className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-2xl font-bold text-sm transition-all"
            >
              <ExternalLink size={18} /> View Site
            </button>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-2xl font-bold text-sm transition-all"
        >
          <LogOut size={18} /> Sign Out
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-12">
          <div>
            <h2 className="text-4xl font-black tracking-tighter text-slate-900">
              Console Overview
            </h2>
            <p className="text-slate-500 font-medium mt-1 text-sm uppercase tracking-widest">
              Control Center v1.0
            </p>
          </div>
          <button
            onClick={() => router.push("/admin/dashboard/add-project")}
            className="bg-blue-600 text-white px-8 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95"
          >
            <Plus size={18} strokeWidth={3} /> New Project
          </button>
        </header>

        {/* QUICK STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-[1.2rem] flex items-center justify-center">
              <Briefcase size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Projects
              </p>
              <h4 className="text-3xl font-black">{projects.length}</h4>
            </div>
          </div>
          <div
            onClick={() => router.push("/admin/dashboard/gallery")}
            className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-5 cursor-pointer hover:border-purple-200 transition-all group"
          >
            <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-[1.2rem] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Camera size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Visual Shots
              </p>
              <h4 className="text-3xl font-black">{galleryCount}</h4>
            </div>
          </div>
          <div className="bg-slate-900 p-7 rounded-[2.5rem] text-white flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Node Status
              </p>
              <h4 className="text-xl font-bold flex items-center gap-2">
                Stable{" "}
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </h4>
            </div>
            <Settings className="text-slate-700" size={32} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* PROFILE SECTION */}
          <section className="lg:col-span-4">
            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40 sticky top-12">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-black text-xl tracking-tight text-slate-900">
                  Identity
                </h3>
                <UserCircle className="text-slate-200" size={28} />
              </div>
              <div className="flex flex-col items-center">
                <div className="relative mb-8 group">
                  <div className="absolute inset-0 bg-blue-100 rounded-[2.5rem] rotate-6 blur-md opacity-40 group-hover:rotate-12 transition-transform"></div>
                  <img
                    src={getImageUrl(profile?.photo_url || "")}
                    className="w-36 h-36 rounded-[2.8rem] object-cover relative z-10 border-4 border-white shadow-xl"
                    alt="Profile"
                  />
                </div>
                <h4 className="text-2xl font-black text-slate-900 mb-1 text-center">
                  {profile?.full_name}
                </h4>
                <p className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-10">
                  {profile?.job_title}
                </p>

                <button
                  onClick={() => router.push("/admin/dashboard/edit-profile")}
                  className="w-full py-5 bg-slate-50 text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-3"
                >
                  Configure Profile <Edit size={16} />
                </button>
              </div>
            </div>
          </section>

          {/* PROJECTS LIST */}
          <section className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between px-6">
              <h3 className="font-black text-xl tracking-tight text-slate-900 uppercase tracking-[0.1em]">
                Project Inventory
              </h3>
              <span className="px-4 py-1 bg-slate-100 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {projects.length} Entries
              </span>
            </div>

            <div className="space-y-4">
              {projects.map((project, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={project.id}
                  className="bg-white p-6 rounded-[2.8rem] border border-slate-100 hover:border-blue-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all flex flex-col md:flex-row items-center gap-8 group"
                >
                  <div className="w-full md:w-40 h-28 rounded-[1.8rem] overflow-hidden bg-slate-100 shrink-0">
                    <img
                      src={getImageUrl(project.image_url)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      alt={project.title}
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left overflow-hidden">
                    <h5 className="font-black text-2xl text-slate-900 tracking-tighter group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h5>
                    <p className="text-sm text-slate-400 font-medium truncate mt-2">
                      {project.link}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="p-4 text-slate-300 hover:text-blue-600 hover:bg-blue-50 rounded-[1.2rem] transition-all">
                      <Edit size={22} />
                    </button>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="p-4 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-[1.2rem] transition-all"
                    >
                      <Trash2 size={22} />
                    </button>
                  </div>
                </motion.div>
              ))}

              {projects.length === 0 && (
                <div className="bg-white py-32 rounded-[4rem] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center text-slate-300">
                  <ImageIcon size={64} className="mb-4 opacity-10" />
                  <p className="font-black uppercase tracking-widest text-xs">
                    Inventory Empty
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
