"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import {
  ArrowLeft,
  Upload,
  Save,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";

export default function AddProjectPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle preview gambar saat dipilih
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Gunakan FormData untuk mengirim file + text
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("link", link);
    if (image) formData.append("image", image);

    try {
      await api.post("/projects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      alert(
        "Gagal menambah project. Pastikan ukuran file tidak terlalu besar.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-medium mb-8 transition"
        >
          <ArrowLeft size={20} /> Back to Dashboard
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8 border-b border-slate-100 bg-slate-50/50">
            <h1 className="text-2xl font-black text-slate-800">
              Add New Project
            </h1>
            <p className="text-slate-500">
              Showcase your latest work to the world.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Input Title */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">
                Project Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Laundry Management System"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Input Link */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">
                Project URL / Link
              </label>
              <input
                type="url"
                placeholder="https://..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>

            {/* Input Description */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">
                Description
              </label>
              <textarea
                rows={4}
                required
                placeholder="Explain what this project is about..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Upload Image */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">
                Project Screenshot
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-200 border-dashed rounded-2xl hover:border-blue-400 transition-colors cursor-pointer relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="space-y-2 text-center">
                  {preview ? (
                    <div className="relative w-full max-h-48 overflow-hidden rounded-lg">
                      <img
                        src={preview}
                        alt="Preview"
                        className="mx-auto object-cover"
                      />
                    </div>
                  ) : (
                    <>
                      <div className="mx-auto h-12 w-12 text-slate-400">
                        <Upload size={48} strokeWidth={1.5} />
                      </div>
                      <div className="text-sm text-slate-600">
                        <span className="text-blue-600 font-bold">
                          Upload a file
                        </span>{" "}
                        or drag and drop
                      </div>
                      <p className="text-xs text-slate-400">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition disabled:opacity-70 shadow-lg shadow-slate-200"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Save size={20} />
                )}
                Publish Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
