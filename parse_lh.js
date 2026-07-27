const fs = require('fs');
const data = JSON.parse(fs.readFileSync('tao-architecture-website.vercel.app-20260727T230523.json', 'utf8'));

console.log('--- CATEGORY SCORES ---');
Object.values(data.categories).forEach(c => console.log(`${c.title}: ${c.score * 100}`));

console.log('\n--- FAILED AUDITS ---');
const failedAudits = Object.values(data.audits).filter(a => a.score !== null && a.score < 0.9 && a.scoreDisplayMode !== 'manual' && a.scoreDisplayMode !== 'notApplicable');
failedAudits.sort((a, b) => a.score - b.score).forEach(a => {
  console.log(`[${a.score}] ${a.id}: ${a.title}`);
  if (a.displayValue) console.log(`    Value: ${a.displayValue}`);
});
