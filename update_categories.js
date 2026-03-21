const fs = require('fs');

let header = fs.readFileSync('src/components/layout/Header.tsx', 'utf8');
header = header.replace(/Dormitorio/g, 'Milenio Plaza');
header = header.replace(/Salas/g, 'El Ensueño');
header = header.replace(/Comedores/g, 'Mercurio');
header = header.replace(/Alcobas/g, 'Ventura');
header = header.replace(/Bebés/g, 'Recolecciones');
header = header.replace(/Decoración/g, 'Mantenimiento');
header = header.replace(/Ofertas/g, 'Reportes');
header = header.replace(/text-\[#059669\]/g, 'text-yellow-500'); // the "Online" text
header = header.replace(/text-primary-500/g, 'text-blue-600'); 
header = header.replace(/bg-primary-500/g, 'bg-blue-600'); 
header = header.replace(/bg-accent-500/g, 'bg-yellow-500'); 
header = header.replace(/text-accent-500/g, 'text-yellow-500'); 
fs.writeFileSync('src/components/layout/Header.tsx', header);

let home = fs.readFileSync('src/app/page.tsx', 'utf8');
home = home.replace(/Dormitorio/g, 'Milenio Plaza');
home = home.replace(/Salas/g, 'El Ensueño');
home = home.replace(/Cocina/g, 'Mercurio');
home = home.replace(/Alcobas/g, 'Ventura');
home = home.replace(/Bebés/g, 'Recolecciones');
home = home.replace(/Decoración/g, 'Mantenimiento');
home = home.replace(/dormitorio/g, 'milenio-plaza');
home = home.replace(/salas/g, 'el-ensueno');
home = home.replace(/comedores/g, 'mercurio');
home = home.replace(/alcobas/g, 'ventura');
home = home.replace(/bebes/g, 'recolecciones');
home = home.replace(/decoracion/g, 'mantenimiento');
home = home.replace('¿Es hora de<br />renovar tu hogar?', 'Gestión<br />de Carritos');
home = home.replace('Descubre nuestra nueva colección de muebles para sala, comedor y alcobas con los mejores diseños de Lindo Hogar.', 'Plataforma administrativa para la gestión, mantenimiento y recolección de monedas de los carritos infantiles (Kids Rides) en centros comerciales.');
home = home.replace('https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=1200'); // rides hero image
home = home.replace('Empieza a comprar', 'Ver Flota');
home = home.replace('Novedades para ti', 'Estado de la Flota');
home = home.replace('Comprar por categoría', 'Gestionar por Ubicación');
fs.writeFileSync('src/app/page.tsx', home);

let category = fs.readFileSync('src/app/catalog/[category]/page.tsx', 'utf8');
category = category.replace(/'dormitorio'/g, "'milenio-plaza'");
category = category.replace(/'bebes'/g, "'recolecciones'");
category = category.replace(/alcobas/g, "ventura");
fs.writeFileSync('src/app/catalog/[category]/page.tsx', category);
