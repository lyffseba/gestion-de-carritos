const fs = require('fs');
let file = fs.readFileSync('src/lib/mockData.ts', 'utf8');

file = file.replace('1548657662-817ab4644a4e', '1544457070-4cd773b4d71e'); // replace missing water filter with decor
file = file.replace('1608508493010-33230c149eb0', '1556910103-1c02745aae4d'); // replace missing humidifier with kitchen appliance
file = file.replace('1578474846543-383efa25608c', '1583847268964-b28dc8f51f92'); // replace missing plates with room

fs.writeFileSync('src/lib/mockData.ts', file);
