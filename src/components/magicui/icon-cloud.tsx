"use client";

import { useEffect, useMemo, useState } from "react";
import { Cloud, ICloud } from "react-icon-cloud";

export const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    dragControl: true,
    // Perbaikan di sini: 'speed' tidak ada, gunakan properti ini untuk mengontrol kecepatan
    clickToFront: 500,
    interval: 20,
    // Jika ingin mengatur kecepatan rotasi otomatis gunakan properti di bawah ini:
    // maxSpeed: 0.04,
    // minSpeed: 0.01,
  },
};

export function IconCloud({ images }: { images?: string[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderedIcons = useMemo(() => {
    if (!images) return null;
    return images.map((url, index) => (
      <a key={index} href="#" onClick={(e) => e.preventDefault()}>
        {/* Tambahkan crossOrigin jika gambar dari CDN eksternal bermasalah */}
        <img
          height="42"
          width="42"
          src={url}
          alt="icon"
          style={{ objectFit: "contain" }}
        />
      </a>
    ));
  }, [images]);

  if (!mounted) return null;

  return (
    // @ts-ignore - Menghindari konflik tipe data internal library dengan React 18/19
    <Cloud {...cloudProps}>{renderedIcons}</Cloud>
  );
}
