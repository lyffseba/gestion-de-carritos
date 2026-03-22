'use client';

import Link from 'next/link';
import { Menu, X, ArrowRight, LogIn, LogOut } from 'lucide-react';
import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();
  
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-obys-bg/90 backdrop-blur-md border-b border-obys-border py-4">
        <div className="max-w-[90%] mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-medium tracking-tighter uppercase text-obys-text hover:text-obys-accent transition-colors">
            GDC / Flota
          </Link>

          <nav className="hidden md:flex items-center gap-12 font-medium text-sm tracking-widest uppercase text-obys-text/70">
            <Link href="/catalog" className="hover:text-obys-text transition-colors">Catálogo</Link>
            <Link href="/admin" className="hover:text-obys-text transition-colors">Admin</Link>
            <Link href="/meetings" className="hover:text-obys-text transition-colors">Reuniones</Link>
            
            {session ? (
              <div className="flex items-center gap-4 border-l border-obys-border pl-8">
                <div className="flex items-center gap-2">
                  {session.user?.image && (
                    <Image 
                      src={session.user.image} 
                      alt="Avatar" 
                      width={24} 
                      height={24} 
                      className="rounded-full"
                    />
                  )}
                  <span className="truncate max-w-[100px] text-obys-text">
                    {session.user?.name?.split(' ')[0]}
                  </span>
                </div>
                <button onClick={() => signOut()} className="hover:text-obys-accent transition-colors flex items-center gap-1">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="border-l border-obys-border pl-8">
                <button onClick={() => signIn('google')} className="flex items-center gap-2 hover:text-obys-accent transition-colors">
                  <LogIn className="w-4 h-4" /> Entrar
                </button>
              </div>
            )}
          </nav>

          <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-obys-text flex items-center gap-4">
            {session?.user?.image && (
              <Image src={session.user.image} alt="Avatar" width={28} height={28} className="rounded-full" />
            )}
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-obys-bg flex flex-col justify-between p-8 font-sans overflow-y-auto">
          <div className="flex items-center justify-between border-b border-obys-border pb-6">
            <span className="text-2xl font-medium tracking-tighter uppercase text-obys-text">Menú</span>
            <button onClick={closeMenu} className="text-obys-text hover:text-obys-accent transition-colors">
              <X className="w-10 h-10" />
            </button>
          </div>
          
          <nav className="flex flex-col gap-8 text-4xl md:text-6xl font-medium tracking-tighter uppercase my-16">
            <Link href="/catalog" onClick={closeMenu} className="text-obys-text hover:text-obys-accent transition-colors flex items-center justify-between group border-b border-obys-border pb-4">
              Ubicaciones <ArrowRight className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link href="/admin" onClick={closeMenu} className="text-obys-text hover:text-obys-accent transition-colors flex items-center justify-between group border-b border-obys-border pb-4">
              Admin <ArrowRight className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            
            {session ? (
              <button onClick={() => { signOut(); closeMenu(); }} className="text-obys-text hover:text-obys-accent transition-colors flex items-center justify-between group border-b border-obys-border pb-4 text-left">
                Salir <LogOut className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ) : (
              <button onClick={() => { signIn('google'); closeMenu(); }} className="text-obys-text hover:text-obys-accent transition-colors flex items-center justify-between group border-b border-obys-border pb-4 text-left">
                Entrar <LogIn className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            )}
          </nav>

          <div className="text-obys-text/50 font-medium uppercase tracking-widest text-sm mt-auto">
            {session ? `Conectado como ${session.user?.email}` : '©2026 GDC. Todos los derechos reservados.'}
          </div>
        </div>
      )}
    </>
  );
}
