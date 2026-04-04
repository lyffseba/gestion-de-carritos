import { addProductAction } from './actions';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import { Button } from '@/components/ui/Button';
import { Settings } from 'lucide-react';
import { FinancialSummary } from '@/components/ui/FinancialSummary';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const { success } = await searchParams;
  
  const liveProducts = MOCK_PRODUCTS.map(p => ({
    _id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    category: p.category,
    imageUrl: p.imageUrl,
    status: p.status || 'Desconocido',
    coins: p.coins || 0,
    createdAt: new Date(),
  }));

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Calculate mock global financial data based on coins and standard rent
  const totalCoins = liveProducts.reduce((sum, p) => sum + (p.coins || 0), 0);
  const coinValue = 2000; // 2000 COP per coin
  const globalRevenue = totalCoins * coinValue;
  const globalExpenses = 595000 * 3; // Let's assume standard rent ($595k) across all 3 malls

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl font-sans text-slate-700">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">
            Panel de Administración
          </h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Gestión financiera, inventario y alta de vehículos.</p>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-sm font-bold tracking-widest uppercase text-slate-400 mb-4">Resumen Financiero Global</h2>
        <FinancialSummary 
          revenue={globalRevenue} 
          expenses={globalExpenses} 
          activeUnits={liveProducts.length}
          currency="COP" 
        />
      </div>

      {success && (
        <div className="bg-[#50e3c2]/10 border border-[#50e3c2]/30 text-[#50e3c2] rounded-lg p-4 mb-8 text-sm font-medium">
          ✅ Vehículo añadido exitosamente al inventario.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ADD NEW PRODUCT FORM */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow-sm border border-slate-200 rounded-2xl p-6">
            <h2 className="text-sm font-bold tracking-widest uppercase text-slate-400 mb-6">
              Añadir Nuevo Vehículo
            </h2>
            
            <form action={addProductAction} className="space-y-5 text-sm font-medium">
              <div>
                <label htmlFor="name" className="block text-slate-700 mb-1.5 font-semibold">Nombre (Vehículo)</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required
                  className="w-full border border-slate-200 bg-white shadow-sm rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all placeholder-slate-400"
                  placeholder="ej. Tren Safari (Verde)"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-slate-700 mb-1.5 font-semibold">Ubicación Asignada</label>
                <select 
                  name="category" 
                  id="category"
                  className="w-full border border-slate-200 bg-white shadow-sm rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
                >
                  <option value="Milenio Plaza">Milenio Plaza</option>
                  <option value="Mercurio">Mercurio</option>
                  <option value="Mi Centro El Porvenir">Mi Centro El Porvenir</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-slate-700 mb-1.5 font-semibold">Tarifa (COP)</label>
                  <input 
                    type="number" 
                    id="price" 
                    name="price" 
                    defaultValue="2000"
                    required
                    className="w-full border border-slate-200 bg-white shadow-sm rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="coins" className="block text-brand-secondary mb-1.5 font-semibold">🪙 Monedas</label>
                  <input 
                    type="number" 
                    id="coins" 
                    name="coins" 
                    defaultValue="0"
                    required
                    className="w-full border border-slate-200 bg-white shadow-sm rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="imageUrl" className="block text-slate-700 mb-1.5 font-semibold">URL de la Foto</label>
                <input 
                  type="url" 
                  id="imageUrl" 
                  name="imageUrl" 
                  required
                  className="w-full border border-slate-200 bg-white shadow-sm rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all placeholder-slate-400"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-slate-700 mb-1.5 font-semibold">Detalles / Mantenimiento</label>
                <textarea 
                  name="description" 
                  id="description" 
                  rows={3}
                  required
                  className="w-full border border-slate-200 bg-white shadow-sm rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all placeholder-slate-400"
                  placeholder="Observaciones..."
                ></textarea>
              </div>

              <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium mt-6 py-6 rounded-lg transition-colors">
                Registrar Vehículo
              </Button>
            </form>
          </div>
        </div>

        {/* INVENTORY TABLE */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow-sm border border-slate-200 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-sm font-bold tracking-widest uppercase text-slate-400">
                Inventario Activo ({liveProducts.length})
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="text-[10px] text-slate-400 uppercase tracking-widest bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Vehículo</th>
                    <th className="px-6 py-4 font-semibold">Ubicación</th>
                    <th className="px-6 py-4 font-semibold">Estado</th>
                    <th className="px-6 py-4 font-semibold text-brand-secondary">Monedas</th>
                    <th className="px-6 py-4 font-semibold">Tarifa</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {liveProducts.map((p) => (
                    <tr key={p._id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                      <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0">
                          <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <span className="line-clamp-1">{p.name}</span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-medium">
                        {p.category}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-md text-xs font-semibold border ${
                            p.status === 'Operativo' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-red-50 border-red-200 text-red-600'
                          }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono font-medium text-slate-900">
                        {p.coins || 0}
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-medium">
                        {formatPrice(p.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
