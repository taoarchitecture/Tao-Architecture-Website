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
    // aspect-video (not a vh-based height) below sm: only — this box is tall
    // and narrow there (same mismatch as HeroSlider's mobile box), which is
    // what the object-contain/mat below actually addresses. Checked sm:/md:
    // against the original object-cover first: that box's aspect ratio is
    // already reasonable at those sizes, so they're left untouched — object-
    // contain there would introduce letterbox bars that don't exist today.
    // min-h-[380px] is a hard floor on top of aspect-video: the heading +
    // paragraph + button below don't shrink with viewport width (fixed
    // text-4xl, not fluid clamp), so at narrow phone widths the aspect-video
    // box (e.g. 180px tall at 320px wide) was shorter than its own content
    // by well over 100px. The centered flex content doesn't get clipped by
    // that shortfall — it overflows the box symmetrically, so the top of
    // the heading rendered above the section entirely, over plain white
    // page background from the section before it. 380px comfortably fits
    // the tallest real case (3-line wrap at 320px wide, measured ~320px).
    <section className="relative w-full aspect-video min-h-[380px] sm:aspect-auto sm:h-[50vh] sm:min-h-[400px] md:h-[70vh] md:min-h-[500px]">
      {/* Background and overlay wrapper with mask for smooth transition.
          overflow-hidden matters here: the mobile scale-105 on the image
          below (see its own comment) bleeds ~10px past this box without it,
          same as HeroSlider's equivalent wrapper already has — unclipped,
          that leaked all the way up to document.documentElement.scrollWidth,
          a real (if usually invisible) horizontal-overflow bug on mobile.
          The mask itself was a hard 2-stop ramp (transparent 0% -> opaque
          10%) that flattens abruptly right at 10% — a sharp slope change
          that reads as a visible hard-edged band (a Mach-band effect),
          made worse because background.jpg is itself nearly blank paper
          in its own top ~20%, so what that short ramp reveals first is a
          flat tinted rectangle, not photo detail, not a gradual reveal.
          A longer 3-stop ease spreads the same fade over more height so
          there's no abrupt elbow in the curve. Below sm: the box is much
          shorter (aspect-video) and the heading sits closer to the top,
          so it keeps a shorter fade tuned to that box instead of reusing
          sm:'s taller one, which would fade out over the heading text. */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none [mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.4)_6%,rgba(0,0,0,0.75)_11%,black_15%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.4)_6%,rgba(0,0,0,0.75)_11%,black_15%)] sm:[mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.55)_20%,black_38%)] sm:[-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.55)_20%,black_38%)]"
      >
        <Image
          src="/img/portfolio/masonry/background.jpg"
          alt="Background"
          fill
          // Below sm: object-contain + a mat behind it, replacing the
          // aggressive mobile zoom/crop the original object-cover caused on
          // this tall, narrow box (see HeroSlider.tsx). sm: and up restore
          // the original full-bleed object-cover exactly. The mat is
          // neutral-bg (the image's own near-white tone), not solid black —
          // with min-h-[380px] added to the section above, this box is now
          // much taller relative to its width than background.jpg's own
          // landscape ratio, so the letterbox bars object-contain adds are
          // large. A solid black mat there read as a hard black stripe
          // right where the top fade should be revealing the photo; a mat
          // matching the photo's own pale tone blends into it instead.
          className="scale-105 bg-neutral-bg object-contain object-center sm:scale-100 sm:bg-transparent sm:object-cover"
          priority
          sizes="100vw"
          quality={85}
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
