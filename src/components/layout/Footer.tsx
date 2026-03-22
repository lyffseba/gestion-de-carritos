import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-obys-text text-obys-bg selection:bg-obys-bg selection:text-obys-text font-sans pt-32 pb-16">
      <div className="max-w-[90%] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32 border-b border-white/20 pb-16">
          <div className="lg:col-span-5">
            <h2 className="text-5xl md:text-8xl font-medium tracking-tighter uppercase leading-[0.85] mb-8">
              GDC<br />
              <span className="text-obys-accent">FLOTA</span>
            </h2>
            <p className="max-w-md text-obys-bg/60 text-lg md:text-xl font-medium leading-snug">
              Plataforma de gestión, monitoreo e inventario para la flota de vehículos en centros comerciales.
            </p>
          </div>
          
          <div className="lg:col-span-3 lg:col-start-7">
            <h3 className="text-white/40 uppercase tracking-widest text-xs font-mono mb-8">Ubicaciones</h3>
            <ul className="flex flex-col gap-4 text-xl md:text-2xl font-medium tracking-tight uppercase">
              <li><Link href="/catalog/milenio-plaza" className="hover:text-obys-accent transition-colors group flex items-center gap-2">Milenio Plaza <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link href="/catalog/el-porvenir" className="hover:text-obys-accent transition-colors group flex items-center gap-2">El Porvenir <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link href="/catalog/mercurio" className="hover:text-obys-accent transition-colors group flex items-center gap-2">Mercurio <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
                                        </ul>
          </div>
          
          <div className="lg:col-span-3">
            <h3 className="text-white/40 uppercase tracking-widest text-xs font-mono mb-8">Admin</h3>
            <ul className="flex flex-col gap-4 text-xl md:text-2xl font-medium tracking-tight uppercase">
              <li><Link href="/admin" className="hover:text-obys-accent transition-colors group flex items-center gap-2">Panel <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link href="/catalog/mantenimiento" className="hover:text-obys-accent transition-colors group flex items-center gap-2">Mantenimiento <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-xs md:text-sm font-medium tracking-widest uppercase text-white/40">
          <p>© {currentYear} GDC</p>
          <p className="mt-4 md:mt-0 hover:text-white transition-colors cursor-default">Bogotá, Colombia</p>
        </div>
      </div>
    </footer>
  );
}
