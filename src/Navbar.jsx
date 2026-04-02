import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, ClipboardCheck, Microscope, UserRound, Home } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="glass-nav">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
        <div className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img src="/assets/FB_IMG_1774867714268.jpg" alt="مختبرات رويال الطبية" style={{ height: '65px', width: '65px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--emerald-green)' }} />
          <div style={{ textDecoration: 'none' }}>
            <h3 style={{ color: 'var(--royal-blue)', margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>مختبرات رويال الطبية</h3>
            <p style={{ color: 'var(--emerald-green)', fontSize: '0.8rem', margin: 0, letterSpacing: '0.5px' }}>Royal Medical Labs</p>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="nav-links flex-center" style={{ gap: '30px' }}>
          <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>الرئيسية</NavLink>
          <NavLink to="/clinics">العيادات</NavLink>
          <NavLink to="/al-moataman">مستشفى المؤتمن</NavLink>
          <NavLink to="/tests">الفحوصات</NavLink>
          <NavLink to="/results">النتائج</NavLink>
          <NavLink to="/contact">اتصل بنا</NavLink>
          {localStorage.getItem('isAuthenticated') === 'true' && (
            <NavLink to="/dashboard" style={{ opacity: 0.7, fontSize: '0.9rem', color: 'var(--emerald-green)' }}>لوحة التحكم</NavLink>
          )}
        </div>

        <div className="nav-cta hide-mobile">
          <a href="https://wa.me/249115566002" target="_blank" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Phone size={18} />
            تواصل معنا
          </a>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }} 
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ 
                position: 'absolute', top: '80px', left: 0, width: '100%', background: 'white', 
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)', overflow: 'hidden', zIndex: 1000 
              }}
            >
              <div style={{ display: 'grid', padding: '20px', gap: '15px', textAlign: 'right' }}>
                 <NavLink to="/" onClick={() => setIsOpen(false)}>الرئيسية</NavLink>
                 <NavLink to="/clinics" onClick={() => setIsOpen(false)}>العيادات</NavLink>
                 <NavLink to="/al-moataman" onClick={() => setIsOpen(false)}>مستشفى المؤتمن</NavLink>
                 <NavLink to="/tests" onClick={() => setIsOpen(false)}>الفحوصات</NavLink>
                 <NavLink to="/results" onClick={() => setIsOpen(false)}>النتائج</NavLink>
                 <NavLink to="/contact" onClick={() => setIsOpen(false)}>اتصل بنا</NavLink>
                 {localStorage.getItem('isAuthenticated') === 'true' && (
                   <NavLink to="/dashboard" onClick={() => setIsOpen(false)} style={{ color: 'var(--emerald-green)', fontWeight: 700 }}>لوحة التحكم</NavLink>
                 )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)} style={{ display: 'none', cursor: 'pointer' }}>
           {isOpen ? <X color="var(--royal-blue)" size={28} /> : <Menu color="var(--royal-blue)" size={28} />}
        </div>
      </div>

      <style>{`
        .nav-links a { font-weight: 600; color: var(--dark-text); transition: var(--transition-smooth); text-decoration: none; }
        .nav-links a:hover, .active-link { color: var(--emerald-green); }
        
        @media (max-width: 1024px) {
          .nav-links, .nav-cta { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
