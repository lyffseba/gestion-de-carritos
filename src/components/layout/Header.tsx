'use client';

import Link from 'next/link';
import { Activity, Terminal, Menu, X, Cpu } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-brand-borderGray bg-brand-dark/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Top Row */}
          <div className="flex items-center justify-between h-16 md:h-20 gap-4">
            
            {/* Logo & Mobile Menu */}
            <div className="flex-shrink-0 flex items-center gap-4">
              <button 
                className="md:hidden text-primary-500 hover:text-primary-300 p-1 -ml-1 rounded-md"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
              <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
                <Cpu className="h-6 w-6 text-primary-500 group-hover:glow-text transition-all" />
                <span className="text-xl md:text-2xl font-mono font-bold text-neutral-100 tracking-wider">
                  KR<span className="text-primary-500">_NODE</span>
                </span>
              </Link>
            </div>

            {/* Central Terminal Display */}
            <div className="flex-1 max-w-2xl hidden md:flex justify-center">
              <div className="px-6 py-2 border border-brand-borderGray bg-brand-grayBg rounded-md font-mono text-xs text-primary-500 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                <span>SYSTEM_STATUS: [ONLINE]</span>
                <span className="text-neutral-500 mx-2">|</span>
                <span className="text-neutral-300">UPTIME: 99.9%</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="hidden lg:inline-flex items-center gap-2 text-xs font-mono font-bold text-neutral-300 hover:text-primary-500 transition-colors">
                <Terminal className="w-4 h-4" />
                [ADMIN_PANEL]
              </Link>
              <Link href="#" className="hidden md:inline-flex items-center justify-center px-4 py-2 border border-primary-500 text-xs font-mono font-bold rounded-sm text-primary-500 hover:bg-primary-500 hover:text-brand-dark transition-all glow-box shadow-sm whitespace-nowrap">
                &gt; REPORT_FAULT
              </Link>
            </div>
          </div>
        </div>
        
        {/* Secondary Nav */}
        <nav className="hidden md:block max-w-7xl mx-auto px-4 md:px-6 lg:px-8 border-t border-brand-borderGray/50">
          <ul className="flex space-x-8 text-xs font-mono font-medium text-neutral-500 py-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            <li><Link href="/catalog" className="hover:text-primary-500 transition-colors whitespace-nowrap">/MILENIO_PLAZA</Link></li>
            <li><Link href="/catalog/el-ensueno" className="hover:text-primary-500 transition-colors whitespace-nowrap">/EL_ENSUENO</Link></li>
            <li><Link href="/catalog/mercurio" className="hover:text-primary-500 transition-colors whitespace-nowrap">/MERCURIO</Link></li>
            <li><Link href="/catalog/ventura" className="hover:text-primary-500 transition-colors whitespace-nowrap">/VENTURA</Link></li>
            <li><Link href="/catalog/mantenimiento" className="hover:text-brand-accent transition-colors whitespace-nowrap">/MANTENIMIENTO</Link></li>
            <li><Link href="/catalog/recolecciones" className="text-brand-secondary hover:text-yellow-400 font-bold transition-colors whitespace-nowrap">/RECOLECCIONES</Link></li>
          </ul>
        </nav>
      </header>

      {/* Mobile Terminal Header (Below Nav) */}
      <div className="md:hidden px-4 py-2 bg-brand-grayBg border-b border-brand-borderGray flex items-center justify-center gap-2 font-mono text-[10px] text-primary-500">
        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"></span>
        SYSTEM_STATUS: [ONLINE]
      </div>

      {/* Mobile Slide-out Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={closeMenu} />
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-brand-dark border-r border-primary-500/30 shadow-[0_0_30px_rgba(0,255,204,0.1)] flex flex-col font-mono">
            <div className="flex items-center justify-between p-4 border-b border-brand-borderGray">
              <span className="text-sm font-bold text-primary-500 flex items-center gap-2">
                <Activity className="w-4 h-4" /> NAV_SYSTEM
              </span>
              <button onClick={closeMenu} className="p-2 text-neutral-500 hover:text-primary-500 rounded-sm">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
              <nav className="flex flex-col space-y-1 px-2 text-sm text-neutral-400">
                <Link href="/catalog" onClick={closeMenu} className="px-3 py-3 rounded-sm hover:bg-brand-grayBg hover:text-primary-500 border-l-2 border-transparent hover:border-primary-500">/MILENIO_PLAZA</Link>
                <Link href="/catalog/el-ensueno" onClick={closeMenu} className="px-3 py-3 rounded-sm hover:bg-brand-grayBg hover:text-primary-500 border-l-2 border-transparent hover:border-primary-500">/EL_ENSUENO</Link>
                <Link href="/catalog/mercurio" onClick={closeMenu} className="px-3 py-3 rounded-sm hover:bg-brand-grayBg hover:text-primary-500 border-l-2 border-transparent hover:border-primary-500">/MERCURIO</Link>
                <Link href="/catalog/ventura" onClick={closeMenu} className="px-3 py-3 rounded-sm hover:bg-brand-grayBg hover:text-primary-500 border-l-2 border-transparent hover:border-primary-500">/VENTURA</Link>
                <Link href="/catalog/mantenimiento" onClick={closeMenu} className="px-3 py-3 rounded-sm hover:bg-brand-grayBg hover:text-brand-accent border-l-2 border-transparent hover:border-brand-accent">/MANTENIMIENTO</Link>
                <Link href="/catalog/recolecciones" onClick={closeMenu} className="px-3 py-3 rounded-sm hover:bg-brand-grayBg text-brand-secondary border-l-2 border-transparent hover:border-brand-secondary font-bold">/RECOLECCIONES</Link>
              </nav>
            </div>
            <div className="border-t border-brand-borderGray p-4 flex flex-col gap-3">
              <Link href="#" onClick={closeMenu} className="flex-1 flex items-center justify-center gap-2 py-3 text-brand-dark font-bold rounded-sm bg-primary-500 hover:bg-primary-400">
                &gt; REPORT_FAULT
              </Link>
              <Link href="/admin" onClick={closeMenu} className="flex-1 flex items-center justify-center gap-2 py-3 text-neutral-300 font-bold border border-neutral-700 rounded-sm hover:border-primary-500 hover:text-primary-500">
                [ADMIN_PANEL]
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}