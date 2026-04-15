const fs = require('fs');
const filepath = 'apps/client/src/data/projects.ts';
let d = fs.readFileSync(filepath, 'utf8');

// Replace , title: 'Describe About Image' or "Describe About Image"
d = d.replace(/,\s*title:\s*['"]Describe About Image['"]/gi, '');

// Also check to replace if it is the first or only element, or without comma.
d = d.replace(/title:\s*['"]Describe About Image['"]/gi, '');

fs.writeFileSync(filepath, d);
console.log('Fixed titles in ', filepath);
