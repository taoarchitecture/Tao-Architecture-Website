import Link from 'next/link';

export default function ProjectNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <p className="mb-8">The project you are looking for does not exist or has not been migrated yet.</p>
        <Link href="/work" className="text-primary-red hover:underline">Back to Work</Link>
      </div>
    </div>
  );
}
