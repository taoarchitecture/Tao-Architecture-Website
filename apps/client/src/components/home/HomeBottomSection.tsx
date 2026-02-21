import Image from 'next/image';
import Link from 'next/link';

interface HomeBottomSectionProps {
  config?: {
    bottomCtaTitle?: string;
    bottomCtaText?: string;
    bottomCtaLink?: string;
  } | null;
}

const HomeBottomSection = ({ config }: HomeBottomSectionProps) => {
  return (
    <section className="relative w-full h-[70vh] min-h-[500px]">
      <Image
        src="/img/portfolio/masonry/background.jpg"
        alt="Background"
        fill
        className="object-cover"
        priority
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-light mb-6 font-agenda tracking-wide">
          {config?.bottomCtaTitle || "Let's Create Something Extraordinary"}
        </h2>
        <p className="text-gray-200 text-lg md:text-xl max-w-2xl mb-10 font-agenda leading-relaxed">
          {config?.bottomCtaText || "Touching intangible beauty of nature, through tangible forms of Architecture."}
        </p>
        <Link 
          href={config?.bottomCtaLink || "/contact"}
          className="inline-block border-2 border-white text-white px-8 py-3 text-sm font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300"
        >
          Start Your Project
        </Link>
      </div>
    </section>
  );
};

export default HomeBottomSection;
