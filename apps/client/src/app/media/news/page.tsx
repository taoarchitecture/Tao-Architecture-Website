'use client';

export default function News() {
  return (
    <main className="min-h-screen bg-white pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-fluid-h1 mb-12 font-agenda font-bold uppercase text-neutral-dark-grey">News</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-neutral-border bg-neutral-bg p-12 text-center text-neutral-dark-grey">
                <p className="font-agenda text-lg italic text-neutral-medium-grey">News updates coming soon...</p>
            </div>
        </div>
      </div>
    </main>
  );
}
