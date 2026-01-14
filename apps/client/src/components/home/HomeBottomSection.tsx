import Image from 'next/image';

const HomeBottomSection = () => {
  return (
    <section className="relative w-full h-[758px]">
      <Image
        src="/img/portfolio/masonry/background.jpg"
        alt="Background"
        fill
        className="object-cover"
        priority
      />
      {/* Overlay content if any - Legacy had commented out text */}
      <div className="absolute inset-0 bg-black/10" /> {/* Optional overlay to darken if needed */}
    </section>
  );
};

export default HomeBottomSection;
