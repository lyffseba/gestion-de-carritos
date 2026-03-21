import Link from 'next/link';
import { Cpu, Terminal } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-borderGray bg-brand-dark font-mono text-xs text-neutral-500">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 text-primary-500 font-bold mb-4">
              <Cpu className="w-4 h-4" />
              <span>KR_NODE // SYSTEM_CORE</span>
            </div>
            <p className="max-w-xs text-neutral-600">
              [ENCRYPTED_CONNECTION] <br />
              Monitoring and telemetry platform for active mobile nodes (Fleet). All operations are tracked.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-primary-500" />
              ACTIVE_SECTORS
            </h3>
            <ul className="space-y-2 text-neutral-500">
              <li><Link href="/catalog" className="hover:text-primary-500 transition-colors">&gt; MILENIO_PLAZA</Link></li>
              <li><Link href="/catalog/el-ensueno" className="hover:text-primary-500 transition-colors">&gt; EL_ENSUENO</Link></li>
              <li><Link href="/catalog/mercurio" className="hover:text-primary-500 transition-colors">&gt; MERCURIO</Link></li>
              <li><Link href="/catalog/ventura" className="hover:text-primary-500 transition-colors">&gt; VENTURA</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">SYSTEM_LINKS</h3>
            <ul className="space-y-2 text-neutral-500">
              <li><Link href="/admin" className="hover:text-primary-500 transition-colors">[ADMIN_ACCESS]</Link></li>
              <li><Link href="/catalog/mantenimiento" className="hover:text-red-500 transition-colors">[MAINTENANCE_LOGS]</Link></li>
              <li><Link href="/catalog/recolecciones" className="hover:text-brand-secondary transition-colors">[COIN_RECOVERY_PROTOCOL]</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-brand-borderGray pt-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-neutral-600">
          <p>SYSTEM_UPTIME: 99.99% // CONNECTION: STABLE</p>
          <p>&copy; {currentYear} KR_NODE. AUTH_LEVEL: ROOT.</p>
        </div>
      </div>
    </footer>
  );
}