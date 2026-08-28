const fs = require('fs');
const path = require('path');

const cssPath = path.join(process.cwd(), 'app', 'globals.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

cssContent = cssContent.replace(
  /:root \{[\s\S]*?\}/,
  \:root {
  /* Smriti Default Regional Theme: Assam */
  --smriti-primary: #8B2F2F; 
  --smriti-secondary: #B8893C; 
  --smriti-accent: #D8A84E; 
  --smriti-bg: #F7F1E6; 
  --smriti-surface: #FFFDF8; 
  --smriti-text: #26332F; 
  --smriti-muted: #6F756F; 
  --smriti-border: rgba(38, 51, 47, 0.12);
  --smriti-success: #527A5A;
  --smriti-warning: #A97836;
  --smriti-error: #A7443D;
  --background: var(--smriti-bg);
  --foreground: var(--smriti-text);
}\
);

cssContent = cssContent.replace(
  /@theme inline \{[\s\S]*?\}/,
  \@theme inline {
  --color-smriti-primary: var(--smriti-primary);
  --color-smriti-secondary: var(--smriti-secondary);
  --color-smriti-accent: var(--smriti-accent);
  --color-smriti-bg: var(--smriti-bg);
  --color-smriti-surface: var(--smriti-surface);
  --color-smriti-text: var(--smriti-text);
  --color-smriti-muted: var(--smriti-muted);
  --color-smriti-border: var(--smriti-border);
  --color-smriti-success: var(--smriti-success);
  --color-smriti-warning: var(--smriti-warning);
  --color-smriti-error: var(--smriti-error);
}\
);

fs.writeFileSync(cssPath, cssContent, 'utf8');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const replaceMap = {
  'theme-primary-dark': 'smriti-primary', // Fallback to primary for dark variants since no -dark in DS
  'theme-primary': 'smriti-primary',
  'theme-secondary': 'smriti-secondary',
  'theme-background': 'smriti-bg',
  'theme-surface-soft': 'smriti-surface',
  'theme-surface': 'smriti-surface',
  'theme-accent-warm': 'smriti-accent',
  'theme-accent-gold': 'smriti-accent',
  'theme-text-main': 'smriti-text',
  'theme-text-muted': 'smriti-muted',
  'theme-success': 'smriti-success',
  'theme-warning': 'smriti-warning',
  'theme-error': 'smriti-error',
};

const dirsToProcess = ['app', 'components'];

dirsToProcess.forEach(d => {
  walkDir(path.join(process.cwd(), d), (filePath) => {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let original = content;
      
      for (const [oldKey, newKey] of Object.entries(replaceMap)) {
        const regex = new RegExp(oldKey, 'g');
        content = content.replace(regex, newKey);
      }
      
      if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated: ' + filePath);
      }
    }
  });
});

console.log('Token migration complete.');
