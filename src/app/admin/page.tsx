import { addProductAction } from './actions';
import { connectDB } from '@/db';
import { Product } from '@/db/models/Product';
import { Button } from '@/components/ui/Button';
import { Terminal } from 'lucide-react';

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
    <div className="container mx-auto px-4 py-12 max-w-7xl font-mono text-neutral-300">
      <div className="flex justify-between items-center mb-8 border-b border-brand-borderGray pb-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Terminal className="w-8 h-8 text-primary-500" />
            ADMIN_TERMINAL
          </h1>
          <p className="text-primary-500 mt-1 text-xs tracking-widest">[CONNECTED TO MONGODB SECURE NODE]</p>
        </div>
      </div>

      {dbError && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 rounded-sm p-4 mb-8 text-sm">
          <strong>SYS_ERR:</strong> {dbError}
        </div>
      )}

      {success === 'true' && (
        <div className="bg-primary-500/10 border border-primary-500/50 text-primary-500 rounded-sm p-4 mb-8 text-sm glow-box">
          [SUCCESS] NODE REGISTERED IN DATABASE.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-1">
          <div className="bg-brand-grayBg border border-brand-borderGray rounded-sm p-6 glow-box">
            <h2 className="text-lg font-bold mb-6 border-b border-brand-borderGray pb-2 text-white uppercase flex items-center gap-2">
              <span className="text-primary-500">&gt;</span> ADD_NEW_NODE
            </h2>
            
            <form action={addProductAction} className="space-y-4 text-sm">
              <div>
                <label htmlFor="name" className="block text-primary-500 mb-1 text-xs">IDENTIFIER (NAME)</label>
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  required 
                  className="w-full border border-brand-borderGray bg-brand-dark rounded-sm px-3 py-2 text-white focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="e.g. TREN_SAFARI_01"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-primary-500 mb-1 text-xs">SECTOR_ASSIGNMENT</label>
                <select 
                  name="category" 
                  id="category" 
                  className="w-full border border-brand-borderGray bg-brand-dark rounded-sm px-3 py-2 text-white focus:outline-none focus:border-primary-500 transition-colors"
                >
                  <option value="Milenio Plaza">MILENIO_PLAZA</option>
                  <option value="El Ensueño">EL_ENSUENO</option>
                  <option value="Mercurio">MERCURIO</option>
                  <option value="Mi Centro El Porvenir">EL_PORVENIR</option>
                  <option value="Ventura">VENTURA</option>
                  <option value="Mantenimiento">MAINTENANCE_BAY</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-primary-500 mb-1 text-xs">RATE_COP</label>
                  <input 
                    type="number" 
                    name="price" 
                    id="price" 
                    defaultValue="2000"
                    required 
                    className="w-full border border-brand-borderGray bg-brand-dark rounded-sm px-3 py-2 text-white focus:outline-none focus:border-primary-500 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="coins" className="block text-brand-secondary mb-1 text-xs">COIN_STATE</label>
                  <input 
                    type="number" 
                    name="coins" 
                    id="coins" 
                    defaultValue="0"
                    required 
                    className="w-full border border-brand-borderGray bg-brand-dark rounded-sm px-3 py-2 text-white focus:outline-none focus:border-brand-secondary transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="imageUrl" className="block text-primary-500 mb-1 text-xs">IMAGE_FEED_URL</label>
                <input 
                  type="url" 
                  name="imageUrl" 
                  id="imageUrl" 
                  required 
                  className="w-full border border-brand-borderGray bg-brand-dark rounded-sm px-3 py-2 text-white focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-primary-500 mb-1 text-xs">TELEMETRY_NOTES</label>
                <textarea 
                  name="description" 
                  id="description" 
                  rows={3} 
                  required 
                  className="w-full border border-brand-borderGray bg-brand-dark rounded-sm px-3 py-2 text-white focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="Maintenance log entry..."
                />
              </div>

              <Button type="submit" className="w-full bg-primary-500 hover:bg-primary-400 text-brand-dark border-transparent font-bold tracking-widest mt-4">
                [INIT_NODE_DEPLOYMENT]
              </Button>
            </form>
          </div>
        </div>

        {/* Database View Column */}
        <div className="lg:col-span-2">
          <div className="bg-brand-grayBg border border-brand-borderGray rounded-sm p-6 glow-box">
            <h2 className="text-lg font-bold mb-6 border-b border-brand-borderGray pb-2 text-white uppercase flex items-center gap-2">
              <span className="text-primary-500">&gt;</span> ACTIVE_NODES_DB ({liveProducts.length})
            </h2>
            
            {liveProducts.length === 0 && !dbError ? (
              <div className="text-center py-12 text-neutral-500 bg-brand-dark rounded-sm border border-brand-borderGray border-dashed text-sm">
                NO NODES DETECTED IN MAINFRAME.
                <br />
                INITIATE DEPLOYMENT SEQUENCE ON THE LEFT.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="text-[10px] text-primary-500 uppercase bg-brand-dark border-b border-primary-500/30">
                    <tr>
                      <th className="px-4 py-3 font-normal">NODE_ID</th>
                      <th className="px-4 py-3 font-normal">SECTOR</th>
                      <th className="px-4 py-3 font-normal">SYS_STATUS</th>
                      <th className="px-4 py-3 font-normal text-brand-secondary">COINS</th>
                      <th className="px-4 py-3 font-normal">RATE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {liveProducts.map((p) => (
                      <tr key={p._id} className="border-b border-brand-borderGray last:border-0 hover:bg-brand-dark transition-colors">
                        <td className="px-4 py-4 font-medium text-white flex items-center gap-3">
                          <img src={p.imageUrl || ''} alt="" className="w-10 h-10 object-cover rounded-sm border border-brand-borderGray grayscale hover:grayscale-0 transition-all" />
                          <div>
                            <div className="font-bold">{p.name.toUpperCase()}</div>
                            <div className="text-[10px] text-neutral-500 font-normal truncate max-w-[120px]">{p.description}</div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-neutral-400 text-xs">{p.category.toUpperCase()}</td>
                        <td className="px-4 py-4">
                          <span className={`text-[10px] font-bold px-2 py-1 border ${
                            p.status === 'Operativo' ? 'bg-primary-500/10 text-primary-500 border-primary-500/30' : 'bg-red-500/10 text-red-500 border-red-500/30'
                          }`}>
                            [{p.status.toUpperCase()}]
                          </span>
                        </td>
                        <td className="px-4 py-4 font-bold text-brand-secondary text-xs">{p.coins}</td>
                        <td className="px-4 py-4 text-neutral-500 text-xs">{formatPrice(p.price)}</td>
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