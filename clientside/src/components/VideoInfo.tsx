import { VideoInfo } from "@/app/page";

export default function VideoInfo({ videoInfo, className }: { videoInfo: VideoInfo, className?: string}) {
  return (
    <div className={`flex flex-col items-center justify-center gap-2 ${className}`}>
      <div className="flex flex-col items-center lg:flex-row gap-2 w-full bg-zinc-800 rounded-xl">
        <img src={videoInfo.thumbnail} alt={videoInfo.title} className="w-[256px] h-[144px] rounded-xl m-2"/>
        <div className="flex flex-col mt-2 mr-4 w-full items-center">
          <h1 className="mx-2 py-1 font-bold">{videoInfo.title}</h1>
          <div className="flex flex-row justify-between w-full text-zinc-300">
            <p className="mx-2 py-1">Resolution: <span className="font-bold">{videoInfo.highest_resolution}</span></p>
            <p className="mx-2 py-1">Audio Quality: <span className="font-bold">{videoInfo.audio_quality}</span></p>
          </div>
          <div className="flex flex-row justify-center items-center gap-2 w-full">
            <button className="px-2 py-1 bg-red-400 transition-colors hover:bg-red-400/45 shadow-lg">Download MP4</button>
            <button className="px-2 py-1 bg-red-400 transition-colors hover:bg-red-400/45 shadow-lg">Download MP3</button>
          </div>
        </div>
      </div>
    </div>
  );
}
