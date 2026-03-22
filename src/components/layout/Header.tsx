'use client';

import Link from 'next/link';
import { Menu, X, Circle, Car } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18 gap-4">
            
            <div className="flex-shrink-0 flex items-center gap-4">
              <button 
                className="md:hidden text-slate-700 hover:text-slate-900 p-1 -ml-1 rounded-md"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
              <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
                <Car className="h-5 w-5 text-slate-900" />
                <span className="text-lg md:text-xl font-medium text-slate-900 tracking-tight">
                  Gestión <span className="text-slate-400 font-normal">de Carritos</span>
                </span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/admin" className="hidden lg:inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                Administración
              </Link>
            </div>
          </div>
        </div>
        
        <nav className="hidden md:block max-w-7xl mx-auto px-4 md:px-6 lg:px-8 border-t border-slate-200">
          <ul className="flex space-x-8 text-sm font-medium text-slate-500 py-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            <li><Link href="/catalog" className="hover:text-slate-900 transition-colors whitespace-nowrap">Todas las Ubicaciones</Link></li>
            <li><Link href="/catalog/milenio-plaza" className="hover:text-slate-900 transition-colors whitespace-nowrap">Milenio Plaza</Link></li>
            <li><Link href="/catalog/el-porvenir" className="hover:text-slate-900 transition-colors whitespace-nowrap">Mi Centro El Porvenir</Link></li>
            <li><Link href="/catalog/mercurio" className="hover:text-slate-900 transition-colors whitespace-nowrap">Mercurio</Link></li>
            <li><Link href="/catalog/el-ensueno" className="hover:text-slate-900 transition-colors whitespace-nowrap">El Ensueño</Link></li>
            <li><Link href="/catalog/ventura" className="hover:text-slate-900 transition-colors whitespace-nowrap">Ventura</Link></li>
          </ul>
        </nav>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={closeMenu} />
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white border-r border-slate-200 flex flex-col font-sans">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <span className="text-sm font-medium text-slate-900 flex items-center gap-2">
                Navegación
              </span>
              <button onClick={closeMenu} className="p-2 text-slate-500 hover:text-slate-900 rounded-sm">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
              <nav className="flex flex-col space-y-1 px-2 text-sm text-slate-500 font-medium">
                <Link href="/catalog" onClick={closeMenu} className="px-3 py-3 rounded-md hover:bg-slate-100 hover:text-slate-900 transition-colors">Todas las Ubicaciones</Link>
                <Link href="/catalog/milenio-plaza" onClick={closeMenu} className="px-3 py-3 rounded-md hover:bg-slate-100 hover:text-slate-900 transition-colors">Milenio Plaza</Link>
                <Link href="/catalog/el-porvenir" onClick={closeMenu} className="px-3 py-3 rounded-md hover:bg-slate-100 hover:text-slate-900 transition-colors">Mi Centro El Porvenir</Link>
                <Link href="/catalog/mercurio" onClick={closeMenu} className="px-3 py-3 rounded-md hover:bg-slate-100 hover:text-slate-900 transition-colors">Mercurio</Link>
                <Link href="/catalog/el-ensueno" onClick={closeMenu} className="px-3 py-3 rounded-md hover:bg-slate-100 hover:text-slate-900 transition-colors">El Ensueño</Link>
                <Link href="/catalog/ventura" onClick={closeMenu} className="px-3 py-3 rounded-md hover:bg-slate-100 hover:text-slate-900 transition-colors">Ventura</Link>
              </nav>
            </div>
            <div className="border-t border-slate-200 p-4">
              <Link href="/admin" onClick={closeMenu} className="flex items-center justify-center gap-2 py-3 text-slate-900 font-medium border border-slate-200 rounded-md hover:bg-slate-100 transition-colors text-sm">
                Administración
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}