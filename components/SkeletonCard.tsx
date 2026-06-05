export default function SkeletonCard() {
  return (
    <div className="bg-[#16181f] rounded-2xl overflow-hidden border border-white/5 flex flex-col animate-pulse">
      <div className="aspect-[4/3] bg-white/5" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-2.5 w-14 bg-white/5 rounded-full" />
        <div className="h-4 w-3/4 bg-white/5 rounded-full" />
        <div className="flex gap-1.5">
          <div className="h-4 w-16 bg-white/5 rounded-md" />
          <div className="h-4 w-14 bg-white/5 rounded-md" />
        </div>
        <div className="h-6 w-1/2 bg-white/5 rounded-full mt-1" />
        <div className="h-9 w-full bg-white/5 rounded-xl mt-1" />
      </div>
    </div>
  );
}
