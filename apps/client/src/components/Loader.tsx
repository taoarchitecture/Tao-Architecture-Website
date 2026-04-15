'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Loader() {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
        >
          {/* Logo */}
          <motion.div
            className="relative w-[200px] h-[56px] mb-8"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/img/tao-logo.png"
              alt="Tao Architecture"
              fill
              className="object-contain object-center"
              priority
              sizes="200px"
            />
          </motion.div>

          {/* Gold progress line */}
          <div className="relative w-32 h-[1.5px] bg-neutral-border overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-primary-gold origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* Tagline */}
          <motion.p
            className="mt-5 text-[10px] font-agenda tracking-[0.35em] uppercase text-neutral-light-grey"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Architecture &amp; Design
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}