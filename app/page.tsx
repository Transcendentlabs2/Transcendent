export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-900 px-4 text-center">
      
      {/* Main Container */}
      <div className="max-w-md space-y-6">
        
        {/* Status Badge */}
        <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-100 rounded-full">
          Coming Soon
        </span>

        {/* Title */}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          TRANSCENDENT
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-600">
          We are crafting a new experience. <br />
          Check back for updates.
        </p>

        {/* Action Button (Placeholder) */}
        <div className="pt-4">
          <button disabled className="px-6 py-3 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-colors opacity-50 cursor-not-allowed">
            Notify me when ready
          </button>
        </div>

      </div>
    </main>
  );
}