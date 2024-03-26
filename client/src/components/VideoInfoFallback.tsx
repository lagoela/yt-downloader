

export default function VideoInfoFallback({className}: {className?: string}) {
  return (
    <div className={`flex flex-col items-center justify-center gap-2 ${className}`}>
      <div className="flex flex-row gap-2 w-full bg-zinc-800 rounded-xl">
        <div className="w-[256px] h-[144px] rounded-xl m-2"></div>
        <div className="flex flex-col mt-2 mr-4 w-full items-center truncate">
          <p className="mx-2 py-1 font-bold">Loading</p>
          <div className="flex flex-row justify-center items-center gap-2 w-full">
            <button disabled className="px-2 py-1 bg-red-400 transition-colors hover:bg-red-400/45 shadow-lg">Download MP4</button>
            <button disabled className="px-2 py-1 bg-red-400 transition-colors hover:bg-red-400/45 shadow-lg">Download MP3</button>
          </div>
        </div>
      </div>
    </div>
  );
}
