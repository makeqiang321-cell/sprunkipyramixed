const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('c:/Users/Administrator/Desktop/2v2.io/index.html', 'utf-8');

// Extract guide article
const guideStart = content.indexOf('<article class="guide-article">');
const guideEnd = content.indexOf('</article>', guideStart);
const guideHtml = content.slice(guideStart, guideEnd);

// Strip HTML tags and styles
let clean = guideHtml
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    // Decode common HTML entities
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–');

const words = clean.split(/\s+/).filter(w => w.length > 0);
const sentences = clean.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0);

console.log('=== GUIDE ARTICLE STATS ===');
console.log(`Total words: ${words.length}`);
console.log(`Total sentences: ${sentences.length}`);
const avgWps = sentences.length > 0 ? (words.length / sentences.length).toFixed(1) : 'N/A';
console.log(`Avg words per sentence: ${avgWps}`);

// Sentence length variety
const sentLens = sentences.map(s => s.split(/\s+/).length);
console.log(`Shortest sentence: ${Math.min(...sentLens)} words`);
console.log(`Longest sentence: ${Math.max(...sentLens)} words`);

// Em-dashes
const emDashes = (clean.match(/—|–|--/g) || []).length;
console.log(`Em-dashes/en-dashes: ${emDashes}`);

// Parentheticals
const parentheticals = (clean.match(/\([^)]+\)/g) || []).length;
console.log(`Parenthetical asides: ${parentheticals}`);

// Exclamation marks
const exclamations = (clean.match(/!/g) || []).length;
console.log(`Exclamation marks: ${exclamations}`);

// Keyword density
const total = words.length;
const keywords = {
  'sprunki retextured': /sprunki\s+retextured/gi,
  'incredibox': /incredibox/gi,
  'music creation': /music\s+creation/gi,
  'sprunki': /sprunki/gi,
  'game': /\bgame\b/gi,
  'character(s)': /character[s]?/gi,
  'beat(s)': /\bbeats?\b/gi,
  'melody/melodies': /melod(y|ies)/gi,
  'drag': /\bdrag\b/gi,
  'mix(es)': /\bmix(es)?\b/gi,
  'track(s)': /\btracks?\b/gi,
  'sound(s)': /\bsounds?\b/gi,
  'unblocked': /unblocked/gi,
  'free': /\bfree\b/gi,
  'fan-made': /fan[- ]made/gi,
  'no download': /no\s+download/gi,
  'mod': /\bmod\b/gi,
};

console.log('\n=== KEYWORD DENSITY (guide article) ===');
for (const [name, pattern] of Object.entries(keywords)) {
  const matches = (clean.match(pattern) || []).length;
  const density = ((matches / total) * 100).toFixed(2);
  console.log(`  ${name}: ${matches} (${density}%)`);
}

// Repeated phrases
console.log('\n=== REPEATED PHRASES ===');
const repeatedChecks = [
  'drag and drop', 'hidden combo', 'from the bottom bar', 'visual cue',
  'music creation game', 'fan-made', 'no download', 'drag characters',
  'create your own', 'retextured character', 'entirely new', 'community',
  'layer multiple characters', 'bottom bar'
];
for (const p of repeatedChecks) {
  const count = (clean.toLowerCase().match(new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  if (count >= 1) {
    console.log(`  "${p}": ${count}x`);
  }
}

// Heading counts
const h2Count = (guideHtml.match(/<h2\b/gi) || []).length;
const h3Count = (guideHtml.match(/<h3\b/gi) || []).length;
console.log(`\nH2 headings: ${h2Count}`);
console.log(`H3 headings: ${h3Count}`);

// Lists and tables
const ulCount = (guideHtml.match(/<ul\b/gi) || []).length;
const olCount = (guideHtml.match(/<ol\b/gi) || []).length;
const tableCount = (guideHtml.match(/<table\b/gi) || []).length;
console.log(`UL lists: ${ulCount}`);
console.log(`OL lists: ${olCount}`);
console.log(`Tables: ${tableCount}`);

// Generic AI marker phrases
console.log('\n=== AI MARKER PHRASES ===');
const aiMarkers = [
  'whether you\'re a', 'in today\'s', 'take your', 'to the next level',
  'unlock your', 'game-changer', 'cutting-edge', 'dive into',
  'unleash your', 'it\'s no secret that', 'it\'s worth noting that',
  'in conclusion', 'as mentioned earlier'
];
for (const marker of aiMarkers) {
  const matches = (clean.toLowerCase().match(new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')) || []).length;
  if (matches > 0) {
    console.log(`  "${marker}": ${matches}x`);
  }
}

// "The [adjective] [noun]" pattern (AI hallmark)
const adjNounPattern = clean.match(/the\s+\w+\s+\w+/gi) || [];
console.log(`"The [adj] [noun]" patterns: ${adjNounPattern.length}`);

// Check for duplicate/oversimilar paragraph openings
console.log('\n=== PARAGRAPH OPENING PATTERNS ===');
const paraStarts = sentences.map(s => s.trim().split(/\s+/).slice(0, 3).join(' ').toLowerCase());
const startFreq = {};
paraStarts.forEach(s => startFreq[s] = (startFreq[s] || 0) + 1);
const repetitiveStarts = Object.entries(startFreq).filter(([k,v]) => v >= 2);
if (repetitiveStarts.length > 0) {
  console.log('  Repetitive sentence starters:');
  repetitiveStarts.forEach(([k,v]) => {
    if (k.length > 5) console.log(`    "${k}" — ${v}x`);
  });
}

// Check for consecutive sentences with similar length (AI pattern)
console.log('\n=== SENTENCE LENGTH PATTERN ANALYSIS ===');
const verySimilarPairs = [];
for (let i = 0; i < sentLens.length - 1; i++) {
  const ratio = Math.max(sentLens[i], sentLens[i+1]) / Math.max(1, Math.min(sentLens[i], sentLens[i+1]));
  if (ratio <= 1.1 && sentLens[i] >= 10) {
    verySimilarPairs.push(i);
  }
}
console.log(`Consecutive sentence pairs with near-identical length (within 10%, >=10 words): ${verySimilarPairs.length}`);
console.log(`Total consecutive pairs: ${sentLens.length - 1}`);
console.log(`Percentage: ${((verySimilarPairs.length / Math.max(1, sentLens.length - 1)) * 100).toFixed(1)}%`);

// Word count by section
console.log('\n=== WORD COUNT BY SECTION (approximate) ===');
const h2Matches = [...guideHtml.matchAll(/<h2\b[^>]*>([^<]+)<\/h2>/gi)];
h2Matches.forEach((m, i) => {
  const start = m.index;
  const end = i < h2Matches.length - 1 ? h2Matches[i + 1].index : guideHtml.length;
  const sectionHtml = guideHtml.slice(start, end);
  const sectionText = sectionHtml.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const wc = sectionText.split(/\s+/).filter(w => w.length > 0).length;
  console.log(`  "${m[1].trim()}": ~${wc} words`);
});

// Overall page word count
const bodyStart = content.indexOf('<body>');
const bodyEnd = content.indexOf('</body>');
const bodyHtml = content.slice(bodyStart + 6, bodyEnd);
const bodyText = bodyHtml.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const bodyWords = bodyText.split(/\s+/).filter(w => w.length > 0).length;
console.log(`\n=== FULL PAGE STATS ===`);
console.log(`Total page word count (body, no scripts/styles): ${bodyWords}`);
console.log(`Guide article word count: ${words.length}`);
console.log(`Guide as % of page: ${((words.length / bodyWords) * 100).toFixed(1)}%`);
