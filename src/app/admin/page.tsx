import { addProductAction } from './actions';
import { connectDB } from '@/db';
import { Product } from '@/db/models/Product';
import { Button } from '@/components/ui/Button';
import { Settings } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const { success } = await searchParams;
  
  let liveProducts: Array<{
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    status: string;
    coins: number;
    createdAt: Date;
  }> = [];
  let dbError = null;
  
  try {
    await connectDB();
    const docs = await Product.find({}).sort({ createdAt: -1 }).limit(20).lean();
    liveProducts = docs.map((doc: unknown) => {
      const d = doc as {
        _id: { toString: () => string };
        name: string;
        description: string;
        price: number;
        category: string;
        imageUrl: string;
        status: string;
        coins: number;
        createdAt: Date;
      };
      return {
        ...d,
        _id: d._id.toString(),
      };
    });
  } catch (error: unknown) {
    dbError = error instanceof Error ? error.message : String(error);
  }

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

      {dbError && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 rounded-lg p-4 mb-8 text-sm">
          <strong>Error de conexión:</strong> {dbError}
        </div>
      )}

      {success === 'true' && (
        <div className="bg-[#50e3c2]/10 border border-[#50e3c2]/30 text-[#50e3c2] rounded-lg p-4 mb-8 text-sm font-medium">
          ¡Vehículo registrado exitosamente en la base de datos!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Column */}
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
                  name="name" 
                  id="name" 
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
                  <option value="El Ensueño">El Ensueño</option>
                  <option value="Mercurio">Mercurio</option>
                  <option value="Mi Centro El Porvenir">Mi Centro El Porvenir</option>
                  <option value="Ventura">Ventura</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-slate-500 mb-1.5">Tarifa (COP)</label>
                  <input 
                    type="number" 
                    name="price" 
                    id="price" 
                    defaultValue="2000"
                    required 
                    className="w-full border border-slate-200 bg-slate-50 rounded-lg px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="coins" className="block text-brand-secondary mb-1.5">🪙 Monedas</label>
                  <input 
                    type="number" 
                    name="coins" 
                    id="coins" 
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
                  name="imageUrl" 
                  id="imageUrl" 
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
                />
              </div>

              <Button type="submit" className="w-full bg-white hover:bg-indigo-700 text-black border-transparent font-medium mt-6 py-2.5 rounded-lg">
                Registrar Vehículo
              </Button>
            </form>
          </div>
        </div>

        {/* Database View Column */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow-sm border border-slate-200 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-6 border-b border-slate-200 pb-3 text-slate-900">
              Inventario Activo ({liveProducts.length})
            </h2>
            
            {liveProducts.length === 0 && !dbError ? (
              <div className="text-center py-16 text-slate-400 bg-slate-50 rounded-xl border border-slate-200 border-dashed text-sm">
                No hay vehículos registrados en la base de datos.
                <br />
                Añade el primer registro usando el formulario.
              </div>
            ) : (
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
                      <tr key={p._id} className="border-b border-slate-200 last:border-0 hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-4 font-medium text-slate-900 flex items-center gap-3">
                          <img src={p.imageUrl || ''} alt="" className="w-10 h-10 object-cover rounded-md border border-slate-200" />
                          <div>
                            <div className="font-semibold line-clamp-1">{p.name}</div>
                            <div className="text-xs text-slate-400 font-normal line-clamp-1 max-w-[150px]">{p.description}</div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-slate-500 text-sm">{p.category}</td>
                        <td className="px-4 py-4">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-md ${
                            p.status === 'Operativo' ? 'bg-[#50e3c2]/10 text-[#50e3c2]' : 'bg-red-500/10 text-red-500'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 font-bold text-brand-secondary text-sm">{p.coins}</td>
                        <td className="px-4 py-4 text-slate-400 text-sm">{formatPrice(p.price)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}