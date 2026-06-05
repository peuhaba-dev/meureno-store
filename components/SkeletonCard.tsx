export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 flex flex-col animate-pulse">
      <div className="aspect-[4/3] bg-gray-100" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-3 w-16 bg-gray-100 rounded-full" />
        <div className="h-4 w-3/4 bg-gray-100 rounded-full" />
        <div className="flex gap-1.5">
          <div className="h-5 w-20 bg-gray-100 rounded-lg" />
          <div className="h-5 w-14 bg-gray-100 rounded-lg" />
        </div>
        <div className="h-7 w-1/2 bg-gray-100 rounded-full mt-1" />
        <div className="h-10 w-full bg-gray-100 rounded-2xl mt-1" />
      </div>
    </div>
  );
}
