export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0F2C] flex items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#FF3B3B]">404</h1>
        <p className="text-xl mt-4">Page not found</p>
        <a href="/" className="mt-6 inline-block text-[#00C853] underline">
          Go back home
        </a>
      </div>
    </div>
  )
}