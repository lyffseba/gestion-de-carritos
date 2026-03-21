const fs = require('fs');
let file = fs.readFileSync('src/lib/mockData.ts', 'utf8');

// Replacements for 404 images
const replacements = {
  // Filtro de agua -> Glass of water / pitcher
  "1594911765275-c54c34a47817": "1548657662-817ab4644a4e",
  // Freidora -> Air fryer / kitchen appliance
  "1626200419188-3ca35d4ff076": "1613915079133-c2d1b5a5b565",
  // Humificador -> Humidifier / essential oils
  "1601614358804-972109867566": "1608508493010-33230c149eb0",
  // Vajilla -> Plates / dishes
  "1611078696130-97645eb49776": "1584269600464-37b1b58a9fe7",
  // Licuadora -> Blender
  "1585237832870-749e7bb2f690": "1585237832870-749e7bb2f690", // broken, will change
  // Mesa de planchar -> Ironing board
  "1581428982868-e410dd1278f1": "1581428982868-e410dd1278f1" // broken, will change
};

file = file.replace('1594911765275-c54c34a47817', '1548657662-817ab4644a4e');
file = file.replace('1626200419188-3ca35d4ff076', '1584269600464-37b1b58a9fe7'); // reusing pot image temporarily or using new one
file = file.replace('1601614358804-972109867566', '1608508493010-33230c149eb0'); // new humidifier
file = file.replace('1611078696130-97645eb49776', '1578474846543-383efa25608c'); // plates
file = file.replace('1585237832870-749e7bb2f690', '1574269909862-7e1d70bb8078'); // blender
file = file.replace('1581428982868-e410dd1278f1', '1595428774223-ef52624120d2'); // reuse room for table

fs.writeFileSync('src/lib/mockData.ts', file);
