import { addProductAction } from './actions';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import { Button } from '@/components/ui/Button';
import { Settings } from 'lucide-react';

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

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl font-sans text-slate-700">
      <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3 tracking-tight">
            <div className="bg-slate-100 p-2 rounded-lg border border-slate-200">
              <Settings className="w-5 h-5 text-slate-900" />
            </div>
            Panel de Administración
          </h1>
          <p className="text-slate-400 mt-2 text-sm">Gestión de inventario y alta de nuevos vehículos.</p>
        </div>
      </div>

      {success && (
        <div className="bg-[#50e3c2]/10 border border-[#50e3c2]/30 text-[#50e3c2] rounded-lg p-4 mb-8 text-sm font-medium">
          ✅ Vehículo añadido exitosamente al inventario.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ADD NEW PRODUCT FORM */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow-sm border border-slate-200 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-6 border-b border-slate-200 pb-3 text-slate-900">
              Añadir Nuevo Vehículo
            </h2>
            
            <form action={addProductAction} className="space-y-4 text-sm font-medium">
              <div>
                <label htmlFor="name" className="block text-slate-500 mb-1.5">Nombre (Vehículo)</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required
                  className="w-full border border-slate-200 bg-slate-50 rounded-lg px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="ej. Tren Safari (Verde)"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-slate-500 mb-1.5">Ubicación Asignada</label>
                <select 
                  name="category" 
                  id="category"
                  className="w-full border border-slate-200 bg-slate-50 rounded-lg px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="Milenio Plaza">Milenio Plaza</option>
                                    <option value="Mercurio">Mercurio</option>
                  <option value="Mi Centro El Porvenir">Mi Centro El Porvenir</option>
                                  </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-slate-500 mb-1.5">Tarifa (COP)</label>
                  <input 
                    type="number" 
                    id="price" 
                    name="price" 
                    defaultValue="2000"
                    required
                    className="w-full border border-slate-200 bg-slate-50 rounded-lg px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="coins" className="block text-brand-secondary mb-1.5">🪙 Monedas</label>
                  <input 
                    type="number" 
                    id="coins" 
                    name="coins" 
                    defaultValue="0"
                    required
                    className="w-full border border-slate-200 bg-slate-50 rounded-lg px-3 py-2.5 text-slate-900 focus:outline-none focus:border-brand-secondary transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="imageUrl" className="block text-slate-500 mb-1.5">URL de la Foto</label>
                <input 
                  type="url" 
                  id="imageUrl" 
                  name="imageUrl" 
                  required
                  className="w-full border border-slate-200 bg-slate-50 rounded-lg px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-slate-500 mb-1.5">Detalles / Mantenimiento</label>
                <textarea 
                  name="description" 
                  id="description" 
                  rows={3}
                  required
                  className="w-full border border-slate-200 bg-slate-50 rounded-lg px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Observaciones..."
                ></textarea>
              </div>

              <Button type="submit" className="w-full bg-white hover:bg-indigo-700 text-black border-transparent font-medium mt-6 py-2.5 rounded-lg">
                Registrar Vehículo
              </Button>
            </form>
          </div>
        </div>

        {/* INVENTORY TABLE */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow-sm border border-slate-200 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-6 border-b border-slate-200 pb-3 text-slate-900">
              Inventario Activo ({liveProducts.length})
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 font-medium">Vehículo</th>
                    <th className="px-4 py-3 font-medium">Ubicación</th>
                    <th className="px-4 py-3 font-medium">Estado</th>
                    <th className="px-4 py-3 font-medium text-brand-secondary">Monedas</th>
                    <th className="px-4 py-3 font-medium">Tarifa</th>
                  </tr>
                </thead>
                <tbody>
                  {liveProducts.map((p) => (
                    <tr key={p._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-4 font-medium text-slate-900 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0">
                          <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="line-clamp-1">{p.name}</span>
                      </td>
                      <td className="px-4 py-4 text-slate-500">
                        {p.category}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                            p.status === 'Operativo' ? 'bg-[#50e3c2]/10 text-[#50e3c2]' : 'bg-red-500/10 text-red-500'
                          }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 font-mono font-medium text-brand-secondary">
                        {p.coins || 0}
                      </td>
                      <td className="px-4 py-4 text-slate-500">
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
