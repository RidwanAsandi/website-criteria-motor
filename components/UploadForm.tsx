"use client";

import Image from "next/image";
import { useState } from "react";

export default function UploadForm() {
  const [urls, setUrls] = useState<string[]>([]);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setUrls(data.urls);
  };

  return (
    <form onSubmit={handleUpload} encType="multipart/form-data">
      <input type="file" name="images" multiple accept="image/*" />
      <button type="submit">Upload</button>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {urls.map((url, i) => (
          <Image
            key={i}
            height={80}
            width={80}
            src={url}
            alt={`uploaded-${i}`}
            className="w-full h-auto"
          />
        ))}
      </div>
    </form>
  );
}
