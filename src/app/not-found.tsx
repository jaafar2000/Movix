// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center mt-20 p-4">
      <h1 className="text-5xl md:text-6xl font-bold">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mt-4">Page Not Found</h2>
      <p className="mt-2 text-lg">The page you are looking for does not exist.</p>
      <Link href="/">
        <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          Go Home
        </button>
      </Link>
    </div>
  );
}
