import Link from 'next/link';

const Banner = () => {
  return (
    <section className="container mx-auto px-4 py-14 md:py-20">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-12">

        {/* Tagline */}
        <div className="max-w-3xl">
          <span className="section-divider" />
          <h1 className="tao-fs-banner font-bold leading-tight font-agenda text-neutral-dark-grey">
            Touching intangible beauty of nature,{' '}
            <br className="hidden md:block" />
            through tangible forms of{' '}
            <span className="font-bold">Architecture</span>
          </h1>
        </div>

        {/* CTA */}
        <div className="flex-shrink-0">
          <Link
            href="/studio"
            className="btn btn-outline-red"
          >
            Know About Us
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Banner;
