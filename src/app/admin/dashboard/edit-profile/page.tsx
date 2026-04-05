"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api, getImageUrl } from "@/lib/api";
import { ArrowLeft, Save, Loader2, Camera, User } from "lucide-react";

export default function EditProfilePage() {
  const [fullName, setFullName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/profile");
      setFullName(res.data.full_name);
      setJobTitle(res.data.job_title);
      setBio(res.data.bio);
      if (res.data.photo_url) {
        setPreview(getImageUrl(res.data.photo_url));
      }
    } catch (err) {
      console.error("Gagal mengambil data profil", err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // Kita gunakan FormData karena ada kemungkinan upload foto baru
    const formData = new FormData();
    formData.append("full_name", fullName);
    formData.append("job_title", jobTitle);
    formData.append("bio", bio);
    if (image) formData.append("image", image);

    try {
      // Endpoint PUT /profile di Go Fiber
      await api.put("/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      alert("Gagal mengupdate profil.");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return <div className="p-20 text-center font-bold">Memuat Profil...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-medium mb-8 transition"
        >
          <ArrowLeft size={20} /> Back to Dashboard
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8 border-b border-slate-100 bg-blue-600 text-white">
            <h1 className="text-2xl font-black">Edit My Profile</h1>
            <p className="opacity-80">
              Update your personal information and photo.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Photo Upload */}
            <div className="flex flex-col items-center pb-6 border-b border-slate-100">
              <div className="relative group cursor-pointer">
                <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-slate-100 shadow-md">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <User size={48} />
                    </div>
                  )}
                </div>
                <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera size={24} />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              <p className="mt-3 text-xs text-slate-400 font-medium">
                Click photo to change
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Job Title
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Short Bio
                </label>
                <textarea
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition resize-none"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition disabled:opacity-70 shadow-lg shadow-blue-200"
            >
              {saving ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Save size={20} />
              )}
              Save Profile Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
