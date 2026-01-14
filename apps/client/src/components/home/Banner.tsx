import Link from 'next/link';

const Banner = () => {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-3xl">
          <h1 className="text-fluid-h1 font-light leading-tight font-agenda">
            <span className="border-b-2 border-black pb-1">
              Touching intangible beauty of nature,
              <br className="hidden md:block" />
              through tangible forms of Architecture
            </span>
          </h1>
        </div>
        <div>
          <Link 
            href="/studio"
            className="btn border-2 border-primary-red text-primary-red hover:bg-primary-red hover:text-white"
          >
            Know About Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
