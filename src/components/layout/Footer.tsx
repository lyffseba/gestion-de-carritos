import Link from 'next/link';
import { Car } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-800 bg-brand-dark text-sm text-neutral-500 font-sans">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 text-white font-medium mb-4 text-base">
              <Car className="w-5 h-5" />
              <span>Kids Rides Management</span>
            </div>
            <p className="max-w-xs text-neutral-400">
              Plataforma de gestión, monitoreo e inventario para la flota de vehículos en centros comerciales.
            </p>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Ubicaciones Activas</h3>
            <ul className="space-y-2 text-neutral-400">
              <li><Link href="/catalog/milenio-plaza" className="hover:text-white transition-colors">Milenio Plaza</Link></li>
              <li><Link href="/catalog/el-porvenir" className="hover:text-white transition-colors">Mi Centro El Porvenir</Link></li>
              <li><Link href="/catalog/mercurio" className="hover:text-white transition-colors">Mercurio</Link></li>
              <li><Link href="/catalog/el-ensueno" className="hover:text-white transition-colors">El Ensueño</Link></li>
              <li><Link href="/catalog/ventura" className="hover:text-white transition-colors">Ventura</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Administración</h3>
            <ul className="space-y-2 text-neutral-400">
              <li><Link href="/admin" className="hover:text-white transition-colors">Panel de Control</Link></li>
              <li><Link href="/catalog/mantenimiento" className="hover:text-white transition-colors">Vehículos en Revisión</Link></li>
              <li><Link href="/catalog/recolecciones" className="hover:text-white transition-colors">Reporte de Recolecciones</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500">
          <p>Operaciones centralizadas - Bogotá, Colombia.</p>
          <p>&copy; {currentYear} Kids Rides. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}