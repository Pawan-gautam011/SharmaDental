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
      {/* Custom Tailwind layer for additional styles that are hard to achieve with utility classes */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@700;800&display=swap');
        
        .nav-link {
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(135deg, #0ea5e9, #10b981);
          border-radius: 999px;
          transform: scaleX(0);
          transition: transform 0.25s;
        }
        .nav-link:hover::after,
        .nav-link.active::after {
          transform: scaleX(1);
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            visibility: hidden;
          }
          to {
            opacity: 1;
            visibility: visible;
          }
        }
        
        .mobile-menu-overlay {
          animation: fadeIn 0.3s ease forwards;
        }
        
        .mobile-menu-panel {
          animation: slideIn 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
        }
      `}</style>
      
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-350 ease-in-out font-['DM_Sans'] ${
          scrolled 
            ? "bg-white/97 backdrop-blur-xl shadow-[0_2px_30px_rgba(0,0,0,0.08)]" 
            : "bg-transparent"
        }`}
        style={{ transition: "all 0.35s ease" }}
      >
        <div
          className={`max-w-[1200px] mx-auto px-6 flex items-center justify-between transition-all duration-350 ${
            scrolled ? "h-16" : "h-[76px]"
          }`}
          style={{ transition: "height 0.35s" }}
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 no-underline"
          >
            <div
              className="w-10 h-10 bg-gradient-to-br from-[#0ea5e9] to-[#10b981] rounded-full flex items-center justify-center text-white font-extrabold text-lg shadow-[0_4px_14px_rgba(14,165,233,0.4)]"
            >
              S
            </div>
            <div>
              <div
                className="font-['Playfair_Display'] text-base font-extrabold bg-gradient-to-r from-[#0ea5e9] to-[#10b981] bg-clip-text text-transparent leading-tight"
              >
                Sharma Dental
              </div>
              <div className="text-[10px] text-slate-500 font-medium">
                Oral Care & Face Clinic
              </div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `nav-link text-sm font-semibold text-slate-700 no-underline px-1 py-1.5 transition-colors duration-200 hover:text-[#0ea5e9] ${
                    isActive ? "active text-[#0ea5e9]" : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2.5">
            <a
              href="https://wa.me/9779815813946"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#10b981] to-[#0ea5e9] text-white border-none rounded-full py-2.5 px-5 text-[13px] font-bold cursor-pointer flex items-center gap-1.5 no-underline transition-all duration-250 shadow-[0_3px_14px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(16,185,129,0.4)] font-['DM_Sans']"
            >
              <FaWhatsapp /> WhatsApp
            </a>
          </div>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden bg-transparent border-none cursor-pointer text-2xl text-slate-700 p-2 flex items-center justify-center rounded-full transition-colors duration-200 hover:bg-black/5"
            aria-label="Open menu"
          >
            <FaBars />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay & Panel */}
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[1001] transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />
      
      {/* Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-[320px] bg-white shadow-[-5px_0_30px_rgba(0,0,0,0.15)] z-[1002] flex flex-col transform transition-transform duration-300 ease-[cubic-bezier(0.2,0.9,0.4,1.1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="px-5 pt-5 pb-3 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-gradient-to-br from-[#0ea5e9] to-[#10b981] rounded-full flex items-center justify-center text-white font-extrabold text-lg">
              S
            </div>
            <div>
              <div className="font-['Playfair_Display'] text-base font-extrabold bg-gradient-to-r from-[#0ea5e9] to-[#10b981] bg-clip-text text-transparent leading-tight">
                Sharma Dental
              </div>
              <div className="text-[9px] text-slate-500 font-medium">
                Oral Care & Face Clinic
              </div>
            </div>
          </div>
          <button
            className="bg-transparent border-none text-2xl cursor-pointer text-slate-500 p-2 flex items-center justify-center rounded-full transition-all duration-200 hover:bg-slate-100 hover:text-[#0ea5e9]"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        </div>
        
        <div className="flex-1 py-4 overflow-y-auto">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center px-5 py-3.5 text-slate-700 no-underline text-base font-semibold transition-all duration-200 mx-3 rounded-xl ${
                  isActive
                    ? "bg-gradient-to-r from-[rgba(14,165,233,0.15)] to-[rgba(16,185,129,0.12)] text-[#0ea5e9]"
                    : "hover:bg-gradient-to-r hover:from-[rgba(14,165,233,0.1)] hover:to-[rgba(16,185,129,0.08)] hover:text-[#0ea5e9]"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
        
        <div className="p-5 border-t border-slate-100 bg-white">
          <a
              href="https://wa.me/9779815813946"
              target="_blank"
              rel="noopener noreferrer"
            className="bg-gradient-to-r from-[#10b981] to-[#0ea5e9] text-white border-none rounded-full py-3.5 px-5 text-sm font-bold cursor-pointer flex items-center justify-center gap-2 no-underline transition-all duration-250 w-full font-['DM_Sans'] shadow-[0_4px_12px_rgba(16,185,129,0.3)] active:scale-[0.98]"
            onClick={() => setIsOpen(false)}
          >
            <FaWhatsapp size={18} /> WhatsApp
          </a>
          <div className="mt-3 text-center">
            <a
              href="tel:+919825823946"
              className="text-[13px] text-slate-500 no-underline inline-flex items-center gap-1.5 py-2 px-3 rounded-[30px] bg-slate-50"
            >
              <FaPhoneAlt size={11} /> +91 98258 23946
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;