const fs = require('fs');

// 1. Remove from mockData.ts
let mock = fs.readFileSync('./src/lib/mockData.ts', 'utf-8');

mock = mock.replace(/  \{\n    id: '2',\n    name: 'Tren Safari \(Verde\)',\n    description: 'Ubicación: Gran Plaza El Ensueño. Requiere revisión de monedero.',\n    price: 2000,\n    category: 'El Ensueño',\n    imageUrl: '\/images\/tren-safari.png',\n    status: 'Revisión',\n    coins: 89,\n  \},\n/g, '');

mock = mock.replace(/  \{\n    id: '4',\n    name: 'Moto de Policía \(Azul\)',\n    description: 'Ubicación: Ventura Terreros. Última recolección: hace 2 días.',\n    price: 2000,\n    category: 'Ventura',\n    imageUrl: '\/images\/moto-policia.png',\n    status: 'Operativo',\n    coins: 45,\n  \}\n/g, '');

fs.writeFileSync('./src/lib/mockData.ts', mock, 'utf-8');

console.log('Cleanup 2 done');
