'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Building2, 
  Compass, 
  Award, 
  PhoneCall, 
  ArrowUpRight 
} from 'lucide-react';

export default function LuxuryNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Track scroll position to adjust navbar styling dynamically
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    {
      name: 'Residences',
      href: '/residences',
      hasDropdown: true,
      items: [
        { title: 'Penthouses', desc: 'Sky-high luxury living', icon: Building2 },
        { title: 'Private Estates', desc: 'Secluded luxury villas & acreage', icon: Compass },
        { title: 'Waterfront', desc: 'Exclusive coastal properties', icon: Award },
      ],
    },
    { name: 'Developments', href: '/developments' },
    { name: 'Journal', href: '/journal' },
    { name: 'About Us', href: '/about' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? 'py-3 bg-[#0B0D12]/80 backdrop-blur-xl border-b border-[#F4F1EA]/10 shadow-2xl'
            : 'py-6 bg-gradient-to-b from-[#0B0D12]/90 via-[#0B0D12]/40 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <nav className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link 
              href="/" 
              className="group flex items-center space-x-3 tracking-wider text-left transition-transform duration-300 hover:scale-105"
            >
              <div className="w-10 h-10 border border-[#C5A880]/40 rounded-full flex items-center justify-center bg-[#0B0D12]/50 group-hover:border-[#C5A880] transition-colors duration-500">
                <span className="font-serif italic text-lg font-semibold text-[#C5A880]">
                  V
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg md:text-xl font-medium tracking-[0.25em] text-[#F4F1EA] uppercase">
                  VALOIS
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#C5A880]">
                  Estates & Mansions
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-10">
              {navLinks.map((link, index) => (
                <div
                  key={index}
                  className="relative group py-2"
                  onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.name)}
                  onMouseLeave={() => link.hasDropdown && setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center space-x-1 text-sm uppercase tracking-[0.2em] font-medium text-[#F4F1EA]/80 hover:text-[#F4F1EA] transition-colors duration-300"
                  >
                    <span>{link.name}</span>
                    {link.hasDropdown && (
                      <ChevronDown className="w-3.5 h-3.5 text-[#C5A880] transition-transform duration-300 group-hover:rotate-180" />
                    )}
                  </Link>

                  {/* Underline Indicator */}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C5A880] transition-all duration-300 group-hover:w-full" />

                  {/* Mega Dropdown Menu */}
                  {link.hasDropdown && activeDropdown === link.name && (
                    <div className="absolute top-full -left-6 pt-4 w-80 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="bg-[#0B0D12]/95 border border-[#F4F1EA]/10 rounded-xl p-3 backdrop-blur-2xl shadow-2xl space-y-1">
                        {link.items.map((item, idx) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={idx}
                              href="#"
                              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-[#F4F1EA]/5 transition-colors group/item"
                            >
                              <div className="p-2 rounded-md bg-[#C5A880]/10 text-[#C5A880] group-hover/item:bg-[#C5A880] group-hover/item:text-[#0B0D12] transition-colors">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-[#F4F1EA] group-hover/item:text-[#C5A880] transition-colors">
                                  {item.title}
                                </h4>
                                <p className="text-xs text-[#F4F1EA]/50 mt-0.5">
                                  {item.desc}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Action / CTA */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/contact"
                className="relative inline-flex items-center justify-center px-6 py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-[#0B0D12] transition-all duration-500 rounded-full overflow-hidden group bg-[#C5A880] hover:bg-[#F4F1EA] shadow-[0_0_20px_rgba(197,168,128,0.3)]"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Inquire Now</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#F4F1EA] hover:text-[#C5A880] transition-colors focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#0B0D12]/95 backdrop-blur-2xl transition-all duration-500 md:hidden flex flex-col justify-between px-8 py-24 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="space-y-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880]">
            Navigation
          </p>
          <div className="flex flex-col space-y-5">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-3xl font-light text-[#F4F1EA] hover:text-[#C5A880] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-6 border-t border-[#F4F1EA]/10 pt-6">
          <div className="flex items-center space-x-3 text-[#F4F1EA]/70 text-sm">
            <PhoneCall className="w-4 h-4 text-[#C5A880]" />
            <span>+1 (800) 275-8839</span>
          </div>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full flex items-center justify-center space-x-2 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-[#0B0D12] bg-[#C5A880] rounded-full"
          >
            <span>Private Consultation</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  );
}