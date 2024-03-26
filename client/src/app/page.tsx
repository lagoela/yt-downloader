"use client";

import Image from "next/image";
import { useState } from "react";
import VideoInfo from "@/components/VideoInfo";
import { Suspense } from "react";
import VideoInfoFallback from "@/components/VideoInfoFallback";
export interface VideoInfo {
  author: string;
  length: number;
  title: string;
  thumbnail: string;
  views: number;
  highest_resolution: string;
  audio_quality: string;
}

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [showVideoInfo, setShowVideoInfo] = useState<boolean>(false);
  const [videoInfo, setVideoInfo] = useState<VideoInfo>({} as VideoInfo);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(JSON.stringify({ url: url }));
    setShowVideoInfo(true);

    fetch("http://localhost:8080/api/v1/getVideoInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    })
      .then((res) => {
        return res.json();
      })
      .then((videoData) => {
        setVideoInfo(videoData);
      });
  };

  return (
    <main className="bg-zinc-900 flex flex-col h-screen justify-center items-center gap-4">
      <h1 className="text-5xl">Download YouTube videos!</h1>
      <Suspense fallback={<VideoInfoFallback className="w-[40%] "/>}>
        {showVideoInfo && (
          <VideoInfo videoInfo={videoInfo} className="w-[40%] " />
        )}
      </Suspense>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Paste YouTube URL"
          className="border-2 border-zinc-700 bg-transparent p-2 rounded-l-full focus:outline-none"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          type="submit"
          className="border-2 border-zinc-700 rounded-r-full border-l-0 p-2"
        >
          Get video
        </button>
      </form>
    </main>
  );
}
