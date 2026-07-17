import Image from 'next/image';
import Link from 'next/link';
import Magnetic from '@/components/ui/Magnetic';

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
      {/* Background and overlay wrapper with mask for smooth transition */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 25%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 25%)'
        }}
      >
        <Image
          src="/img/portfolio/masonry/background.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
        <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-light mb-6 font-agenda tracking-wide">
          {config?.bottomCtaTitle || "Let's Create Something Extraordinary"}
        </h2>
        <p className="mb-10 max-w-2xl font-agenda text-lg leading-relaxed text-white/85 md:text-xl">
          {config?.bottomCtaText || "Touching intangible beauty of nature, through tangible forms of Architecture."}
        </p>
        <div className="pointer-events-auto">
          <Magnetic>
            <Link 
              href={config?.bottomCtaLink || "/contact"}
              className="inline-block border-2 border-white text-white px-8 py-3 text-sm font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300"
            >
              Start Your Project
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
};

export default HomeBottomSection;
