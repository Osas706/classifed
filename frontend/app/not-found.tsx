import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-sand text-center p-5">
      <h1 className="text-3xl font-bold text-navy">Page not found</h1>
      <p className="text-muted">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="bg-navy text-white px-6 py-3 rounded-full font-semibold">
        Go home
      </Link>
    </div>
  );
}
