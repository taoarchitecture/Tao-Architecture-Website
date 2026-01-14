const fs = require('fs');
const path = require('path');

const legacyDir = path.join(__dirname, '../../../legacy');
const projectsFile = path.join(__dirname, 'src/data/projects.ts');

function getLegacyFiles() {
    const files = fs.readdirSync(legacyDir);
    return files.filter(f => f.endsWith('.php') && 
        !f.startsWith('index') && 
        !f.startsWith('header') && 
        !f.startsWith('footer') && 
        !f.startsWith('contact') && 
        !f.startsWith('services') && 
        !f.startsWith('career') && 
        !f.startsWith('studio') &&
        !f.startsWith('work') &&
        !f.includes('submit') &&
        !f.includes('bkp') &&
        !f.includes('org')
    );
}

function getModernProjects() {
    const content = fs.readFileSync(projectsFile, 'utf8');
    
    // Extract projects array IDs
    const projectsMatch = content.match(/export const projects: Project\[\] = \[([\s\S]*?)\];/);
    const projectsArrayStr = projectsMatch ? projectsMatch[1] : '';
    const projectIds = [];
    const idRegex = /id:\s*'([^']+)'/g;
    let match;
    while ((match = idRegex.exec(projectsArrayStr)) !== null) {
        projectIds.push(match[1]);
    }

    // Extract projectDetails keys
    const detailsMatch = content.match(/export const projectDetails: Record<string, ProjectDetail> = {([\s\S]*?)};/);
    const detailsStr = detailsMatch ? detailsMatch[1] : '';
    // The keys in the object are strings like 'some-id': { ... }
    const detailIds = [];
    const keyRegex = /'([^']+)':\s*{/g;
    while ((match = keyRegex.exec(detailsStr)) !== null) {
        detailIds.push(match[1]);
    }

    return { projectIds, detailIds };
}

function analyze() {
    const legacyFiles = getLegacyFiles();
    const { projectIds, detailIds } = getModernProjects();

    console.log('--- Analysis Report ---');
    console.log(`Total Legacy Candidates: ${legacyFiles.length}`);
    console.log(`Total Modern Projects (Summary): ${projectIds.length}`);
    console.log(`Total Modern Details: ${detailIds.length}`);

    const missingInSummary = [];
    const missingInDetails = [];
    const fileMap = {};

    legacyFiles.forEach(file => {
        const id = file.replace('.php', '');
        fileMap[id] = file;

        // Check if this ID exists in modern projects (fuzzy match or direct?)
        // Direct match first
        if (!projectIds.includes(id)) {
            missingInSummary.push(id);
        }
        if (!detailIds.includes(id)) {
            missingInDetails.push(id);
        }
    });

    console.log('\n--- Missing in Summary (projects array) ---');
    missingInSummary.forEach(id => console.log(id));

    console.log('\n--- Missing in Details (projectDetails map) ---');
    missingInDetails.forEach(id => console.log(id));

    console.log('\n--- Details Missing Summary ---');
    // Check if any details exist but have no summary entry (orphaned details)
    const orphanedDetails = detailIds.filter(id => !projectIds.includes(id));
    orphanedDetails.forEach(id => console.log(id));

    console.log('\n--- Summary Missing Details ---');
    // Check if any summary exists but has no details (broken links)
    const brokenLinks = projectIds.filter(id => !detailIds.includes(id) && 
        !['luxuryvillas', 'hospitality', 'cozyhomes', 'apartments', 'housing', 'corporate', 'commercial', 'institutional', 'products', 'installations'].includes(id) // Exclude category IDs
    );
    brokenLinks.forEach(id => console.log(id));
}

analyze();
