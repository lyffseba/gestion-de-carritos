const fs = require('fs');

function replaceFile(path, fromReg, toStr) {
  let content = fs.readFileSync(path, 'utf-8');
  content = content.replace(fromReg, toStr);
  fs.writeFileSync(path, content, 'utf-8');
}

// 1. Remove El Ensueño and Ventura from Footer
let footer = fs.readFileSync('./src/components/layout/Footer.tsx', 'utf-8');
footer = footer.replace(/<li><Link href="\/catalog\/el-ensueno".*?<\/li>\n/g, '');
footer = footer.replace(/<li><Link href="\/catalog\/ventura".*?<\/li>\n/g, '');
fs.writeFileSync('./src/components/layout/Footer.tsx', footer, 'utf-8');

// 2. Remove from Header
let header = fs.readFileSync('./src/components/layout/Header.tsx', 'utf-8');
header = header.replace(/<Link href="\/catalog\/el-ensueno".*?<\/Link>\n/g, '');
header = header.replace(/<Link href="\/catalog\/ventura".*?<\/Link>\n/g, '');
fs.writeFileSync('./src/components/layout/Header.tsx', header, 'utf-8');

// 3. Remove from page.tsx
let page = fs.readFileSync('./src/app/page.tsx', 'utf-8');
page = page.replace(/{ id: 'el-ensueno', name: 'El Ensueño' },\n/g, '');
page = page.replace(/{ id: 'ventura', name: 'Ventura' }\n/g, '');
fs.writeFileSync('./src/app/page.tsx', page, 'utf-8');

// 4. Remove from admin/page.tsx
let admin = fs.readFileSync('./src/app/admin/page.tsx', 'utf-8');
admin = admin.replace(/<option value="El Ensueño">El Ensueño<\/option>\n/g, '');
admin = admin.replace(/<option value="Ventura">Ventura<\/option>\n/g, '');
fs.writeFileSync('./src/app/admin/page.tsx', admin, 'utf-8');

// 5. Remove from catalog/[category]/page.tsx
let category = fs.readFileSync('./src/app/catalog/[category]/page.tsx', 'utf-8');
category = category.replace(/, { category: 'el-ensueno' }/g, '');
category = category.replace(/, { category: 'ventura' }/g, '');
category = category.replace(/'el-ensueno', /g, '');
category = category.replace(/'ventura'/g, '');
category = category.replace(/'el-ensueno': 'El Ensueño',\n/g, '');
category = category.replace(/'ventura': 'Ventura'\n/g, '');
fs.writeFileSync('./src/app/catalog/[category]/page.tsx', category, 'utf-8');

console.log('Cleanup done');
