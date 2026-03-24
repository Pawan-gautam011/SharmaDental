import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaWhatsapp, FaPhoneAlt, FaTimes, FaBars } from "react-icons/fa";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Gallery", path: "/gallery" },
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
        
        /* Improved mobile menu styles */
        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(4px);
          z-index: 1001;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }
        .mobile-menu-overlay.open {
          opacity: 1;
          visibility: visible;
        }
        .mobile-menu-panel {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 85%;
          max-width: 320px;
          background: white;
          box-shadow: -5px 0 30px rgba(0,0,0,0.15);
          transform: translateX(100%);
          transition: transform 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
          z-index: 1002;
          display: flex;
          flex-direction: column;
        }
        .mobile-menu-panel.open {
          transform: translateX(0);
        }
        .mobile-menu-header {
          padding: 20px 20px 12px;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .mobile-menu-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .mobile-menu-logo-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg,#0ea5e9,#10b981);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 800;
          font-size: 18px;
        }
        .mobile-menu-logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 16px;
          font-weight: 800;
          background: linear-gradient(135deg,#0ea5e9,#10b981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1.2;
        }
        .mobile-menu-close {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #64748b;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.2s;
        }
        .mobile-menu-close:hover {
          background: #f1f5f9;
          color: #0ea5e9;
        }
        .mobile-nav-links {
          flex: 1;
          padding: 16px 0;
          overflow-y: auto;
        }
        .mobile-link {
          display: flex;
          align-items: center;
          padding: 14px 20px;
          color: #334155;
          text-decoration: none;
          font-size: 16px;
          font-weight: 600;
          transition: all 0.2s;
          margin: 4px 12px;
          border-radius: 12px;
        }
        .mobile-link:hover, .mobile-link.active {
          background: linear-gradient(135deg,rgba(14,165,233,0.1),rgba(16,185,129,0.08));
          color: #0ea5e9;
        }
        .mobile-link.active {
          background: linear-gradient(135deg,rgba(14,165,233,0.15),rgba(16,185,129,0.12));
        }
        .mobile-cta-section {
          padding: 20px;
          border-top: 1px solid #f1f5f9;
          background: white;
        }
        .mobile-whatsapp-btn {
          background: linear-gradient(135deg,#10b981,#0ea5e9);
          color: white;
          border: none;
          border-radius: 999px;
          padding: 14px 20px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-decoration: none;
          transition: all 0.25s;
          width: 100%;
          font-family: inherit;
          box-shadow: 0 4px 12px rgba(16,185,129,0.3);
        }
        .mobile-whatsapp-btn:active {
          transform: scale(0.98);
        }
        .mobile-contact-info {
          margin-top: 12px;
          text-align: center;
        }
        .mobile-contact-phone {
          font-size: 13px;
          color: #64748b;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          border-radius: 30px;
          background: #f8fafc;
        }
        .hamburger-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 24px;
          color: #334155;
          padding: 8px;
          display: none;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: background 0.2s;
        }
        .hamburger-btn:hover {
          background: rgba(0,0,0,0.05);
        }
        @media(max-width:900px){
          .desktop-nav, .desktop-cta { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          boxShadow: scrolled ? "0 2px 30px rgba(0,0,0,0.08)" : "none",
          transition: "all 0.35s ease",
          fontFamily: "'DM Sans',sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            height: scrolled ? 64 : 76,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "height 0.35s",
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                background: "linear-gradient(135deg,#0ea5e9,#10b981)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 800,
                fontSize: 18,
                boxShadow: "0 4px 14px rgba(14,165,233,0.4)",
              }}
            >
              S
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: 16,
                  fontWeight: 800,
                  background: "linear-gradient(135deg,#0ea5e9,#10b981)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1.2,
                }}
              >
                Sharma Dental
              </div>
              <div style={{ fontSize: 10, color: "#64748b", fontWeight: 500 }}>
                Oral Care & Face Clinic
              </div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div
            style={{ display: "flex", alignItems: "center", gap: 28 }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `nav-link${isActive ? " active" : ""}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop CTA */}
          <div
            style={{ display: "flex", gap: 10, alignItems: "center" }}
            className="desktop-cta"
          >
            <a href="https://wa.me/9825823946" className="nav-btn-whatsapp">
              <span>
                <FaWhatsapp />
              </span>{" "}
              WhatsApp
            </a>
          </div>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="hamburger-btn"
            aria-label="Open menu"
          >
            <FaBars />
          </button>
        </div>
      </nav>

      {/* Improved Mobile Menu Overlay & Panel */}
      <div className={`mobile-menu-overlay ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(false)} />
      <div className={`mobile-menu-panel ${isOpen ? "open" : ""}`}>
        <div className="mobile-menu-header">
          <div className="mobile-menu-logo">
            <div className="mobile-menu-logo-icon">S</div>
            <div>
              <div className="mobile-menu-logo-text">Sharma Dental</div>
              <div style={{ fontSize: 9, color: "#64748b", fontWeight: 500 }}>Oral Care & Face Clinic</div>
            </div>
          </div>
          <button className="mobile-menu-close" onClick={() => setIsOpen(false)} aria-label="Close menu">
            <FaTimes />
          </button>
        </div>
        
        <div className="mobile-nav-links">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `mobile-link${isActive ? " active" : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
        
        <div className="mobile-cta-section">
          <a
            href="https://wa.me/9825823946"
            className="mobile-whatsapp-btn"
            onClick={() => setIsOpen(false)}
          >
            <FaWhatsapp size={18} /> WhatsApp
          </a>
          <div className="mobile-contact-info">
            <a href="tel:+919825823946" className="mobile-contact-phone">
              <FaPhoneAlt size={11} /> +91 98258 23946
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;