import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Gallery', path: '/gallery' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@700;800&display=swap');
        .nav-link { font-size:14px; font-weight:600; color:#334155; text-decoration:none; padding:6px 4px; position:relative; transition:color 0.2s; letter-spacing:0.2px; }
        .nav-link::after { content:''; position:absolute; bottom:-2px; left:0; right:0; height:2px; background:linear-gradient(135deg,#0ea5e9,#10b981); border-radius:999px; transform:scaleX(0); transition:transform 0.25s; }
        .nav-link:hover, .nav-link.active { color:#0ea5e9; }
        .nav-link:hover::after, .nav-link.active::after { transform:scaleX(1); }
        .nav-btn-whatsapp { background:linear-gradient(135deg,#10b981,#0ea5e9); color:white; border:none; border-radius:999px; padding:10px 20px; font-size:13px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:7px; text-decoration:none; transition:all 0.25s; box-shadow:0 3px 14px rgba(16,185,129,0.3); font-family:inherit; }
        .nav-btn-whatsapp:hover { transform:translateY(-2px); box-shadow:0 6px 20px rgba(16,185,129,0.4); }
        .nav-btn-call { background:white; color:#0ea5e9; border:2px solid #0ea5e9; border-radius:999px; padding:9px 18px; font-size:13px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:7px; text-decoration:none; transition:all 0.25s; font-family:inherit; }
        .nav-btn-call:hover { background:#0ea5e9; color:white; }
        .mobile-link { display:block; padding:13px 16px; color:#334155; text-decoration:none; font-size:15px; font-weight:600; border-radius:12px; transition:all 0.2s; }
        .mobile-link:hover, .mobile-link.active { background:linear-gradient(135deg,rgba(14,165,233,0.08),rgba(16,185,129,0.08)); color:#0ea5e9; }
      `}</style>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        boxShadow: scrolled ? '0 2px 30px rgba(0,0,0,0.08)' : 'none',
        transition: 'all 0.35s ease',
        fontFamily: "'DM Sans',sans-serif",
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: scrolled ? 64 : 76, display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'height 0.35s' }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg,#0ea5e9,#10b981)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 18, boxShadow: '0 4px 14px rgba(14,165,233,0.4)' }}>S</div>
            <div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 800, background: 'linear-gradient(135deg,#0ea5e9,#10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.2 }}>Sharma Dental</div>
              <div style={{ fontSize: 10, color: '#64748b', fontWeight: 500 }}>Oral Care & Face Clinic</div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="desktop-nav">
            {navLinks.map(link => (
              <NavLink key={link.name} to={link.path} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>{link.name}</NavLink>
            ))}
          </div>

          {/* Desktop CTA */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }} className="desktop-cta">
            <a href="https://wa.me/919876543210" className="nav-btn-whatsapp">
              <span>💬</span> WhatsApp
            </a>
            <a href="tel:+919876543210" className="nav-btn-call">
              <span>📞</span> Call
            </a>
          </div>

          {/* Hamburger */}
          <button onClick={() => setIsOpen(!isOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: '#334155', padding: 4, display: 'none' }} className="hamburger">
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div style={{ background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(14,165,233,0.1)', padding: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            {navLinks.map(link => (
              <NavLink key={link.name} to={link.path} className={({ isActive }) => `mobile-link${isActive ? ' active' : ''}`} onClick={() => setIsOpen(false)}>
                {link.name}
              </NavLink>
            ))}
            <div style={{ display: 'flex', gap: 10, marginTop: 16, paddingTop: 16, borderTop: '1px solid #f1f5f9' }}>
              <a href="https://wa.me/919876543210" className="nav-btn-whatsapp" style={{ flex: 1, justifyContent: 'center' }}>💬 WhatsApp</a>
              <a href="tel:+919876543210" className="nav-btn-call" style={{ flex: 1, justifyContent: 'center' }}>📞 Call Now</a>
            </div>
          </div>
        )}
      </nav>
      <style>{`
        @media(max-width:900px){ .desktop-nav,.desktop-cta{display:none!important;} .hamburger{display:block!important;} }
      `}</style>
    </>
  );
};

export default Navbar;