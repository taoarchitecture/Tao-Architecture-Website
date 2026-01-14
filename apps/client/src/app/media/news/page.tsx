'use client';

export default function News() {
  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-light mb-12 font-agenda uppercase">News</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-12 text-center text-neutral-dark-grey border border-gray-100">
                <p className="italic font-agenda text-lg">News updates coming soon...</p>
            </div>
        </div>
      </div>
    </main>
  );
}