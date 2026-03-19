import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="gfg-footer">
      <div className="gfg-footer-inner">
        <p className="gfg-footer-copyright">
          © 2026 GeeksforGeeks Campus Club – <span className="gfg-footer-rit">RIT</span> | Made for GfG Challenge
        </p>
        <p className="gfg-footer-sample text-xs opacity-80 mt-1">
          Sample data for demonstration. Official GfG Campus Chapter at Rajalakshmi Institute of Technology.
        </p>
        <div className="gfg-footer-links">
          <Link to="/">Home</Link>
          <Link to="/join">Join</Link>
          <Link to="/events">Events</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/community">Community</Link>
          <a href="https://www.instagram.com/geeksforgeeks.rit" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.linkedin.com/in/gfg-rit/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <Link to="/contact">Contact</Link>
        </div>
        <p className="gfg-footer-powered mt-2 text-[11px] opacity-75">
          Powered by{' '}
          <a href="https://www.geeksforgeeks.org/" target="_blank" rel="noopener noreferrer" className="gfg-footer-gfg-link">
            GeeksforGeeks
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
