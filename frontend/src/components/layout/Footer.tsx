import { Link } from 'react-router-dom';

interface FooterProps {
  className?: string;
}

const Footer = ({ className = '' }: FooterProps) => {
  return (
    <footer className={`w-full py-4 relative z-10 text-center text-sm bg-white/60 dark:bg-[#111113]/70 backdrop-blur-lg text-[#475569] dark:text-[#a1a1aa] border-t border-[#e2e8f0]/50 dark:border-[#3f3f46]/40 transition-colors ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-1.5">
        <p className="font-medium text-[#0f172a] dark:text-[#fafafa] text-xs sm:text-sm">
          © {new Date().getFullYear()} GeeksforGeeks Campus Club – <span className="text-[color:var(--gfg-accent)] font-bold">RIT</span> | Made for GfG Challenge
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#94a3b8] dark:text-[#71717a]">
          <Link to="/" className="hover:text-[color:var(--gfg-accent)] transition-colors">Home</Link>
          <Link to="/join" className="hover:text-[color:var(--gfg-accent)] transition-colors">Join</Link>
          <Link to="/events" className="hover:text-[color:var(--gfg-accent)] transition-colors">Events</Link>
          <Link to="/resources" className="hover:text-[color:var(--gfg-accent)] transition-colors">Resources</Link>
          <Link to="/community" className="hover:text-[color:var(--gfg-accent)] transition-colors">Community</Link>
          <Link to="/contact" className="hover:text-[color:var(--gfg-accent)] transition-colors">Contact</Link>
        </div>
        <p className="text-[10px] text-[#94a3b8] dark:text-[#71717a]">
          Powered by{' '}
          <a href="https://www.geeksforgeeks.org/" target="_blank" rel="noopener noreferrer" className="text-[color:var(--gfg-accent)] hover:underline font-bold">
            GeeksforGeeks
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
