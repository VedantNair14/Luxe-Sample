'use client';

import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';

const EditorialMarquee = ({ text }: { text: string }) => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const skewVelocity = useTransform(scrollVelocity, [-1000, 1000], [-5, 5]);
  const skewVelocitySpring = useSpring(skewVelocity, { stiffness: 100, damping: 30 });

  return (
    <div className="py-20 border-y border-foreground/10 overflow-hidden bg-background">
      <motion.div 
        style={{ skewX: skewVelocitySpring }}
        className="flex whitespace-nowrap"
      >
        <motion.div 
          animate={{ x: [0, "-50%"] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {[...Array(6)].map((_, i) => (
            <span 
              key={i} 
              className="text-8xl md:text-[12rem] font-black uppercase tracking-tighter mx-10 opacity-10"
              style={{ WebkitTextStroke: '1px var(--foreground)' }}
            >
              {text}
            </span>
          ))}
        </motion.div>
        <motion.div 
          animate={{ x: [0, "-50%"] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {[...Array(6)].map((_, i) => (
            <span 
              key={i} 
              className="text-8xl md:text-[12rem] font-black uppercase tracking-tighter mx-10 opacity-10"
              style={{ WebkitTextStroke: '1px var(--foreground)' }}
            >
              {text}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EditorialMarquee;
