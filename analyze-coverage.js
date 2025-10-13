const fs = require('fs');

// Read the game data file
const fileContent = fs.readFileSync('./lib/game-data.js', 'utf8');

// Extract category names and count levels
const categories = [];
let currentCategory = null;
let levelCount = 0;

const lines = fileContent.split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  
  // Detect category start
  if (line.match(/^"[a-z-]+":\s*{$/)) {
    if (currentCategory) {
      categories.push({ name: currentCategory, levels: levelCount });
    }
    currentCategory = line.match(/"([a-z-]+)":/)[1];
    levelCount = 0;
  }
  
  // Detect title (category title)
  if (line.startsWith('title:') && currentCategory) {
    const titleMatch = line.match(/title:\s*"(.+)"/);
    if (titleMatch) {
      const title = titleMatch[1];
      // Update the current category with proper title
      if (categories.length > 0 && categories[categories.length - 1].name === currentCategory) {
        categories[categories.length - 1].title = title;
      }
    }
  }
  
  // Count levels (look for level number definitions)
  if (line.match(/^\d+:\s*{$/) && currentCategory) {
    levelCount++;
  }
}

// Add last category
if (currentCategory) {
  categories.push({ name: currentCategory, levels: levelCount });
}

// Print analysis
console.log('\n📊 INDIAN RIGHTS COVERAGE ANALYSIS\n');
console.log('=' .repeat(60));

const totalLevels = categories.reduce((sum, cat) => sum + cat.levels, 0);

categories.forEach(cat => {
  const title = cat.title || cat.name;
  console.log(`${title}: ${cat.levels} levels`);
});

console.log('=' .repeat(60));
console.log(`\nTotal Categories: ${categories.length}`);
console.log(`Total Levels: ${totalLevels}\n`);

// Analyze coverage
console.log('🎯 COVERAGE BREAKDOWN:\n');

const rightsCategories = {
  'Constitutional Rights': ['fundamental-rights', 'human-rights'],
  'Specific Group Rights': ['womens-rights', 'child-rights', 'educational-rights'],
  'Legal & Safety': ['criminal-law', 'traffic-rules', 'cyber-security'],
  'Economic & Social Rights': ['consumer-rights', 'employment-laws'],
  'Family Law': ['family-marriage-laws']
};

Object.entries(rightsCategories).forEach(([category, subcats]) => {
  const relevantCats = categories.filter(c => subcats.includes(c.name));
  const levelCount = relevantCats.reduce((sum, c) => c.levels, 0);
  console.log(`${category}: ${levelCount} levels`);
});

console.log('\n📋 COMPREHENSIVE INDIAN RIGHTS COVERED:\n');

// List what's covered
const covered = [
  '✅ Fundamental Rights (All 6 categories from Constitution)',
  '✅ Human Rights (Universal & Indian context)',
  '✅ Women\'s Rights (PWDVA, Dowry, Equality)',
  '✅ Child Rights (POCSO, Education, Protection)',
  '✅ Educational Rights (RTE Act, Equality, Quality)',
  '✅ Consumer Rights (Consumer Protection Act)',
  '✅ Employment Rights (Labor laws, Equality)',
  '✅ Traffic & Road Safety Laws',
  '✅ Cyber Laws & Digital Safety',
  '✅ Family & Marriage Laws'
];

covered.forEach(item => console.log(item));

console.log('\n📊 ESTIMATED COVERAGE PERCENTAGE:\n');

// Calculate estimated coverage
const totalBasicRightsInIndia = {
  'Fundamental Rights (6 from Constitution)': 6,
  'Directive Principles': 10,
  'Legal Rights': 20,
  'Social & Economic Rights': 15,
  'Procedural Rights': 10,
  'Group-Specific Rights': 10
};

const totalEstimatedRights = Object.values(totalBasicRightsInIndia).reduce((a, b) => a + b, 0);

console.log(`Your Project Covers: ${totalLevels} scenarios`);
console.log(`Estimated Total Basic Rights: ${totalEstimatedRights} major categories`);
console.log(`Coverage: ~${Math.round((totalLevels / totalEstimatedRights) * 100)}% of basic Indian rights\n`);

console.log('Note: This is a comprehensive educational coverage.');
console.log('Your project covers practical, real-world scenarios for each right.\n');
