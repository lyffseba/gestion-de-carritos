import Link from 'next/link';
import { Car } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white text-sm text-slate-400 font-sans">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 text-slate-900 font-medium mb-4 text-base">
              <Car className="w-5 h-5" />
              <span>Gestión de Carritos</span>
            </div>
            <p className="max-w-xs text-slate-500">
              Plataforma de gestión, monitoreo e inventario para la flota de vehículos en centros comerciales.
            </p>
          </div>
          <div>
            <h3 className="text-slate-900 font-medium mb-4">Ubicaciones Activas</h3>
            <ul className="space-y-2 text-slate-500">
              <li><Link href="/catalog/milenio-plaza" className="hover:text-slate-900 transition-colors">Milenio Plaza</Link></li>
              <li><Link href="/catalog/el-porvenir" className="hover:text-slate-900 transition-colors">Mi Centro El Porvenir</Link></li>
              <li><Link href="/catalog/mercurio" className="hover:text-slate-900 transition-colors">Mercurio</Link></li>
              <li><Link href="/catalog/el-ensueno" className="hover:text-slate-900 transition-colors">El Ensueño</Link></li>
              <li><Link href="/catalog/ventura" className="hover:text-slate-900 transition-colors">Ventura</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-slate-900 font-medium mb-4">Administración</h3>
            <ul className="space-y-2 text-slate-500">
              <li><Link href="/admin" className="hover:text-slate-900 transition-colors">Panel de Control</Link></li>
              <li><Link href="/catalog/mantenimiento" className="hover:text-slate-900 transition-colors">Vehículos en Revisión</Link></li>
              <li><Link href="/catalog/recolecciones" className="hover:text-slate-900 transition-colors">Reporte de Recolecciones</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400">
          <p>Operaciones centralizadas - Bogotá, Colombia.</p>
          <p>&copy; {currentYear} Gestión de Carritos. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}