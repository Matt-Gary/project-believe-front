export function SkeletonCard() {
  return (
    <div className="flex flex-col items-center justify-center p-6 w-[450px] self-start rounded-lg animate-pulse">
      <div className="bg-gray-700 w-full rounded-t-lg flex justify-center p-2">
        <div className="rounded-full size-28 bg-gray-600"></div>
      </div>
      <div className="bg-gray-800 w-full justify-center p-6 rounded-b-lg flex flex-col items-center gap-4">
        <div className="h-6 w-32 bg-gray-600 rounded"></div>
        <div className="h-4 w-40 bg-gray-600 rounded"></div>
        <div className="h-6 w-full bg-gray-600 rounded"></div>
        <div className="h-6 w-full bg-gray-600 rounded"></div>
        <div className="h-6 w-full bg-gray-600 rounded"></div>
      </div>
    </div>
  );
}
