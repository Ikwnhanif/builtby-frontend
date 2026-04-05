"use client";

import { useEffect, useState } from "react";
import { api, getImageUrl } from "@/lib/api";
import { Project, Profile } from "@/types";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ChevronRight,
  Camera,
  ArrowUpRight,
  Sparkles,
  Zap,
  Database,
  ShieldCheck,
} from "lucide-react";

// --- MAGIC UI COMPONENTS ---
import { IconCloud } from "@/components/magicui/icon-cloud";
import { MagicCard } from "@/components/magicui/magic-card";
import { AnimatedList } from "@/components/magicui/animated-list";
import { ShinyButton } from "@/components/magicui/shiny-button";

// --- INTERFACES ---
interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image_url: string;
}

// --- DATA CONFIGURATION ---
const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "php",
  "postgresql",
  "firebase",
  "nginx",
  "docker",
  "git",
  "github",
  "figma",
  "laravel",
  "mysql",
  "go",
];

const systemNotifications = [
  {
    name: "Backend Status",
    description: "Go Fiber Engine Active",
    icon: <Zap size={14} />,
    color: "bg-blue-500",
  },
  {
    name: "Database Node",
    description: "MySQL Cluster Synced",
    icon: <Database size={14} />,
    color: "bg-cyan-500",
  },
  {
    name: "Security Layer",
    description: "JWT Auth Verified",
    icon: <ShieldCheck size={14} />,
    color: "bg-green-500",
  },
  {
    name: "Visual Storage",
    description: "Gallery Assets Loaded",
    icon: <Camera size={14} />,
    color: "bg-purple-500",
  },
];

// --- CUSTOM SVG ICONS (Anti-Error) ---
const GithubIcon = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function HomePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`,
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const [prof, proj, gall] = await Promise.all([
          api.get("/profile"),
          api.get("/projects"),
          api.get("/gallery"),
        ]);
        setProfile(prof.data);
        setProjects(Array.isArray(proj.data) ? proj.data : []);
        setGallery(Array.isArray(gall.data) ? gall.data : []);
      } catch (e) {
        console.error("Fetch Error:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"
        />
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
          builtby.ikwnhanif
        </span>
      </div>
    );

  if (!profile)
    return (
      <div className="h-screen flex items-center justify-center font-black text-slate-300">
        SYSTEM OFFLINE
      </div>
    );

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-600 selection:text-white font-sans overflow-x-hidden antialiased pt-28">
      {/* 1. TOP PROGRESS BAR */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-400 z-[100] origin-left"
      />

      {/* 2. NAVIGATION */}
      <nav className="fixed top-6 inset-x-0 z-50 flex justify-center px-6">
        <div className="bg-white/70 backdrop-blur-2xl border border-slate-200/50 px-8 py-4 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 flex items-center gap-16">
          <div className="flex items-center gap-3 font-black text-xl tracking-tighter">
            <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black shadow-inner">
              H
            </div>
            by.ikwnhanif
          </div>
          <div className="hidden md:flex gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
            {["projects", "gallery", "about"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="hover:text-blue-600 transition-all"
              >
                {item}
              </a>
            ))}
          </div>
          <ShinyButton
            text="Console"
            onClick={() => (window.location.href = "/admin/login")}
          />
        </div>
      </nav>

      {/* 3. HERO SECTION */}
      <section
        id="about"
        className="relative min-h-[90vh] flex items-center pb-20 overflow-hidden"
      >
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 antialiased">
          <div className="absolute top-[15%] left-[-15%] w-[45rem] h-[45rem] bg-blue-50 rounded-full blur-[120px] opacity-60 animate-pulse" />
          <div className="absolute bottom-[10%] right-[-10%] w-[35rem] h-[35rem] bg-cyan-50 rounded-full blur-[120px] opacity-60" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center w-full relative z-10">
          <div className="space-y-12 animate-slide-up antialiased">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100 shadow-sm">
              <Sparkles size={14} className="animate-bounce text-blue-600" />{" "}
              Active Infrastructure
            </div>

            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-7xl md:text-[9rem] font-black text-slate-900 leading-[0.85] tracking-tighter"
              >
                {profile.job_title.split(" ")[0]} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 antialiased">
                  {profile.job_title.split(" ").slice(1).join(" ")}
                </span>
              </motion.h1>
              <p className="text-xl text-slate-500 font-medium max-w-lg leading-relaxed border-l-4 border-blue-600 pl-6 bg-slate-50/50 py-4 rounded-r-3xl shadow-inner">
                I am{" "}
                <span className="text-slate-900 font-bold">
                  {profile.full_name}
                </span>
                . <br />
                {profile.bio}
              </p>
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              <ShinyButton
                text="Explore Projects"
                className="px-12 py-6 rounded-[2rem]"
                onClick={() =>
                  document.getElementById("projects")?.scrollIntoView()
                }
              />
              <div className="flex gap-4">
                <a
                  href="https://github.com/ikwnhanif"
                  target="_blank"
                  className="p-5 bg-white border border-slate-100 rounded-3xl hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                >
                  <GithubIcon size={24} />
                </a>
                <a
                  href="https://linkedin.com/in/ikwnhanif"
                  target="_blank"
                  className="p-5 bg-white border border-slate-100 rounded-3xl hover:bg-[#0077B5] hover:text-white transition-all shadow-sm"
                >
                  <LinkedinIcon size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: ICON CLOUD DENGAN FOTO PROFIL DI KANAN ATAS */}
          <div className="relative flex flex-col items-center justify-center pt-20">
            <div className="relative w-full h-[600px] flex items-center justify-center relative z-10 antialiased">
              {/* --- MAGIC UI ICON CLOUD (Bola Ikon Berputar) --- */}
              <IconCloud images={images} />

              {/* Background Glow di belakang bola */}
              <div className="absolute inset-0 -z-10 bg-blue-500/10 blur-[100px] rounded-full animate-pulse" />

              {/* --- FOTO PROFIL DI KANAN ATAS (PENTING!) --- */}
              <motion.div
                initial={{ opacity: 0, x: 50, y: -50 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{
                  delay: 0.5,
                  duration: 1,
                  type: "spring",
                  stiffness: 100,
                }}
                className="absolute top-10 right-10 z-20"
              >
                <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-[16px] border-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] bg-white relative group">
                  <img
                    src={getImageUrl(profile.photo_url)}
                    alt={profile.full_name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                  />
                  {/* Efek kilatan cahaya tipis pada foto (Shiny Effect) */}
                  <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "linear",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -z-10 group-hover:z-30"
                  />
                </div>
              </motion.div>
            </div>

            {/* Floating System Activity List */}
            <div className="absolute bottom-10 left-0 w-full max-w-[280px] hidden xl:block z-30">
              <AnimatedList>
                {systemNotifications.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 bg-white/80 backdrop-blur-md border border-slate-100 rounded-2xl shadow-2xl mb-4 transition-all hover:scale-105 antialiased"
                  >
                    <div
                      className={`${item.color} p-2.5 rounded-xl text-white shadow-lg`}
                    >
                      {item.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase text-slate-900 tracking-wider antialiased">
                        {item.name}
                      </span>
                      <span className="text-[9px] font-bold text-slate-400 antialiased">
                        {item.description}
                      </span>
                    </div>
                  </div>
                ))}
              </AnimatedList>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROJECTS SECTION */}
      <section id="projects" className="py-40 bg-slate-50/50 relative">
        <div className="max-w-7xl mx-auto px-6 px-4">
          <div className="mb-28 space-y-4 text-center">
            <span className="text-blue-600 font-black uppercase text-[10px] tracking-[0.5em]">
              Selected Works
            </span>
            <h2 className="text-6xl md:text-[8rem] font-black tracking-tighter text-slate-900 antialiased">
              Portfolio.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-6">
            {projects.map((project) => (
              <MagicCard
                key={project.id}
                className="p-8 rounded-[3.5rem] bg-white border border-slate-100 shadow-2xl transition-all group overflow-hidden antialiased"
              >
                <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden bg-slate-100 mb-10 shadow-inner">
                  <img
                    src={getImageUrl(project.image_url)}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute top-8 right-8 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 text-slate-900 antialiased">
                    <ArrowUpRight size={24} />
                  </div>
                </div>
                <div className="px-4">
                  <h3 className="text-4xl font-black mb-4 tracking-tighter group-hover:text-blue-600 transition-colors antialiased">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 font-medium text-lg leading-relaxed mb-10 line-clamp-2 antialiased">
                    {project.description}
                  </p>
                  <a
                    href={project.link}
                    target="_blank"
                    className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-all antialiased"
                  >
                    Launch Project{" "}
                    <div className="h-[2px] w-12 bg-blue-600 group-hover:w-20 transition-all duration-500" />
                  </a>
                </div>
              </MagicCard>
            ))}
          </div>
        </div>
      </section>

      {/* 5. GALLERY SECTION */}
      <section id="gallery" className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-32 space-y-6 px-6">
            <div className="w-20 h-20 bg-blue-50 rounded-[2rem] flex items-center justify-center text-blue-600 shadow-inner">
              <Camera size={32} />
            </div>
            <h2 className="text-6xl md:text-[8rem] font-black tracking-tighter text-slate-900 antialiased leading-none">
              Moments.
            </h2>
            <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-xs antialiased">
              Visual Journals & Photography
            </p>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 px-8">
            {gallery.length > 0 ? (
              gallery.map((photo, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -15 }}
                  className="relative rounded-[3.5rem] overflow-hidden border border-slate-100 shadow-xl group bg-slate-50 antialiased cursor-pointer"
                >
                  <img
                    src={getImageUrl(photo.image_url)}
                    alt={photo.title}
                    className="w-full object-cover transition-all duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 p-12 flex flex-col justify-end text-white antialiased">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-2 antialiased">
                      {photo.category}
                    </span>
                    <h4 className="text-3xl font-black tracking-tight leading-none antialiased">
                      {photo.title}
                    </h4>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-slate-200 font-black tracking-widest uppercase text-xs">
                No entries found.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="bg-slate-900 py-32 text-white border-t border-slate-800 antialiased">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center px-6">
          <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center font-black text-2xl mb-12 shadow-[0_0_50px_rgba(37,99,235,0.3)]">
            H
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-10 text-white antialiased">
            builtby.ikwnhanif
          </h2>
          <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-20 antialiased">
            <a
              href="mailto:hikwan7@gmail.com"
              className="hover:text-blue-400 transition-colors antialiased"
            >
              Email
            </a>
            <a
              href="https://linkedin.com/in/ikwnhanif"
              target="_blank"
              className="hover:text-blue-400 transition-colors antialiased"
            >
              <LinkedinIcon size={20} />
            </a>
            <a
              href="https://github.com/ikwnhanif"
              target="_blank"
              className="hover:text-blue-400 transition-colors antialiased"
            >
              <GithubIcon size={20} />
            </a>
          </div>
          <p className="text-[10px] font-bold text-white/10 tracking-[1em] uppercase border-t border-white/5 pt-12 w-full antialiased">
            © 2026 Developed with Caffeine & Love
          </p>
        </div>
      </footer>
    </div>
  );
}
