"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import {
  Camera,
  ChevronLeft,
  Upload,
  Loader2,
  X,
  Image as ImageIcon,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AddGalleryPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Landscape");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return alert("Pilih foto terlebih dahulu!");

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("image", image);

    try {
      await api.post("/gallery", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess(true);
      setTimeout(() => router.push("/admin/dashboard/gallery"), 1500);
    } catch (err) {
      console.error("Upload gagal", err);
      alert("Gagal mengunggah foto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12 font-sans selection:bg-blue-600 selection:text-white">
      <div className="max-w-3xl mx-auto">
        {/* HEADER */}
        <header className="mb-12 space-y-4">
          <button
            onClick={() => router.push("/admin/dashboard/gallery")}
            className="group flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors text-[10px] font-black uppercase tracking-widest"
          >
            <ChevronLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Gallery
          </button>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter flex items-center gap-4">
            New Visual Entry <Camera className="text-blue-600" size={32} />
          </h1>
        </header>

        <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-2xl shadow-slate-200/50">
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* UPLOAD AREA */}
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                Visual Source
              </label>
              <div className="relative">
                {!preview ? (
                  <label className="flex flex-col items-center justify-center w-full h-80 border-4 border-dashed border-slate-100 rounded-[2.5rem] cursor-pointer hover:bg-slate-50 hover:border-blue-200 transition-all group">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <div className="p-5 bg-blue-50 text-blue-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                        <Upload size={32} />
                      </div>
                      <p className="text-sm font-bold text-slate-500">
                        Drop your shot here or click to browse
                      </p>
                      <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest font-black">
                        JPG, PNG, WEBP (Max 5MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                ) : (
                  <div className="relative h-80 w-full rounded-[2.5rem] overflow-hidden group shadow-inner bg-slate-100">
                    <img
                      src={preview}
                      className="w-full h-full object-cover"
                      alt="Preview"
                    />
                    <button
                      onClick={() => {
                        setPreview(null);
                        setImage(null);
                      }}
                      className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-md text-red-600 rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-xl"
                    >
                      <X size={20} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* FORM FIELDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                  Shot Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Golden Hour at Bromo"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none font-bold transition-all"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                  Category
                </label>
                <select
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none font-bold transition-all appearance-none cursor-pointer"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Landscape">Landscape</option>
                  <option value="Street">Street</option>
                  <option value="Portrait">Portrait</option>
                  <option value="Architecture">Architecture</option>
                  <option value="Abstract">Abstract</option>
                </select>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              disabled={loading || success}
              type="submit"
              className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-all shadow-xl ${
                success
                  ? "bg-green-500 text-white shadow-green-200"
                  : "bg-slate-900 text-white hover:bg-blue-600 shadow-slate-200"
              } disabled:opacity-70`}
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : success ? (
                <>
                  Success Deployed <CheckCircle2 size={20} />
                </>
              ) : (
                <>Authorize & Upload Shot</>
              )}
            </button>
          </form>
        </div>

        <p className="mt-10 text-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">
          Builtby visual engine • Local storage node
        </p>
      </div>
    </div>
  );
}
