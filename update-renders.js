const fs = require('fs');

let mock = fs.readFileSync('./src/lib/mockData.ts', 'utf-8');

// Replace specific images
mock = mock.replace(/\/images\/porvenir-coche\.jpg/g, '/renders/mcqueen.png');
mock = mock.replace(/\/images\/mercurio-mcqueen-[12]\.jpg/g, '/renders/mcqueen.png');

mock = mock.replace(/\/images\/porvenir-heli\.jpg/g, '/renders/helicoptero.png');
mock = mock.replace(/\/images\/mercurio-moto\.jpg/g, '/renders/chopper.png');

// And maybe the old ones too
mock = mock.replace(/\/images\/bomberos\.png/g, '/renders/mcqueen.png'); // reuse red car for bomberos
mock = mock.replace(/\/images\/moto-policia\.png/g, '/renders/chopper.png'); // reuse chopper for moto
mock = mock.replace(/\/images\/moto-n95-2\.jpg/g, '/renders/chopper.png'); 
mock = mock.replace(/\/images\/avion-azul-[23]\.jpg/g, '/renders/helicoptero.png'); 

fs.writeFileSync('./src/lib/mockData.ts', mock, 'utf-8');

console.log('Update done');

mock = fs.readFileSync('./src/lib/mockData.ts', 'utf-8');
mock = mock.replace(/\/images\/mercurio-jeep\.jpg/g, '/renders/jeep.png');
mock = mock.replace(/\/images\/pony\.png/g, '/renders/pony.png');
mock = mock.replace(/\/images\/tren-safari\.png/g, '/renders/tren.png');
fs.writeFileSync('./src/lib/mockData.ts', mock, 'utf-8');

console.log('Update 2 done');
