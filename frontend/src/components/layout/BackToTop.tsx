import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      className="fixed right-5 bottom-44 sm:right-6 sm:bottom-44 md:bottom-24 z-[101] p-3 rounded-full shadow-lg shadow-[color:var(--gfg-accent)]/20 transition-all duration-300 transform hover:-translate-y-1 bg-[color:var(--gfg-accent)] text-white hover:bg-[color:var(--gfg-accent-strong)]"
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};

export default BackToTop;
