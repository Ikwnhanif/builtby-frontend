"use client";

import { useEffect, useState } from "react";
import { api, getImageUrl } from "@/lib/api";
import { useRouter } from "next/navigation";
import {
  Camera,
  Plus,
  Trash2,
  ChevronLeft,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import { motion } from "framer-motion";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image_url: string;
}

export default function GalleryManager() {
  const [photos, setPhotos] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const res = await api.get("/gallery");
      setPhotos(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Gagal ambil foto", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Hapus foto ini dari galeri?")) {
      await api.delete(`/gallery/${id}`);
      fetchPhotos();
    }
  };

  if (loading)
    return (
      <div className="p-20 text-center font-black opacity-20">
        LOADING GALLERY...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="space-y-1">
            <button
              onClick={() => router.push("/admin/dashboard")}
              className="group flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors text-[10px] font-black uppercase tracking-widest mb-4"
            >
              <ChevronLeft
                size={14}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back to Console
            </button>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter flex items-center gap-4">
              Visual Gallery <Camera className="text-blue-600" size={32} />
            </h1>
          </div>

          <button
            onClick={() => router.push("/admin/dashboard/gallery/add")}
            className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"
          >
            <Plus size={18} /> Upload New Shot
          </button>
        </header>

        {/* PHOTO GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={photo.id}
              className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all"
            >
              <div className="aspect-square relative overflow-hidden bg-slate-100">
                <img
                  src={getImageUrl(photo.image_url)}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleDelete(photo.id)}
                    className="p-4 bg-white text-red-600 rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-xl"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {photo.category}
                </span>
                <h3 className="font-bold text-slate-900 mt-3 truncate">
                  {photo.title}
                </h3>
              </div>
            </motion.div>
          ))}

          {photos.length === 0 && (
            <div className="col-span-full py-32 rounded-[3rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
              <ImageIcon size={48} className="mb-4 opacity-20" />
              <p className="font-bold italic">
                Gallery is empty. Start uploading your shots.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
