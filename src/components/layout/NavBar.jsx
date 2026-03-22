import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

/**
 * NavBar Component
 * 
 * Shared top navigation bar with clean, minimal styling.
 * Active link has deep red underline (#8B0000).
 * No flashy hover effects, no heavy shadows.
 * 
 * Usage:
 * <NavBar />
 */
const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/saved', label: 'Saved' },
    { path: '/digest', label: 'Digest' },
    { path: '/settings', label: 'Settings' },
    { path: '/proof', label: 'Proof' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="nav-bar">
      <div className="nav-bar__container">
        {/* Logo / App Name */}
        <div className="nav-bar__logo">
          <span className="nav-bar__title">Job Notification App</span>
        </div>

        {/* Desktop Navigation */}
        <ul className="nav-bar__list desktop-only">
          {navLinks.map((link) => (
            <li key={link.path} className="nav-bar__item">
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `nav-bar__link ${isActive ? 'nav-bar__link--active' : ''}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger Menu */}
        <button
          className="nav-bar__toggle mobile-only"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className={`hamburger ${isMenuOpen ? 'hamburger--open' : ''}`}>
            <span className="hamburger__line"></span>
            <span className="hamburger__line"></span>
            <span className="hamburger__line"></span>
          </span>
        </button>
      </div>

      {/* Mobile Dropdown Panel */}
      {isMenuOpen && (
        <div className="nav-bar__mobile-menu mobile-only">
          <ul className="nav-bar__mobile-list">
            {navLinks.map((link) => (
              <li key={link.path} className="nav-bar__mobile-item">
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `nav-bar__mobile-link ${isActive ? 'nav-bar__mobile-link--active' : ''}`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
