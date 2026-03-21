const fs = require('fs');
let code = fs.readFileSync('src/components/ui/ProductCard.tsx', 'utf8');

// Change 'KIDS' to 'KR' (Kids Rides)
code = code.replace(/>KIDS</g, '>KR<');

// Adding coins metric to card details
code = code.replace(
  /<p className="text-xs text-gray-400 mt-0.5">\{product.category\} · Nuevo con etiquetas<\/p>/,
  `{product.coins !== undefined ? (
          <p className="text-xs text-yellow-600 mt-1 font-medium flex items-center">
            🪙 <span>{product.coins} Monedas</span>
          </p>
        ) : (
          <p className="text-xs text-gray-400 mt-1">{product.category}</p>
        )}
        {product.status && (
          <p className="text-xs text-blue-600 mt-0.5 font-bold">Estado: {product.status}</p>
        )}`
);
fs.writeFileSync('src/components/ui/ProductCard.tsx', code);
