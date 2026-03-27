const fs = require('fs');
const path = require('path');

const moves = [
  ['src/components/About.tsx', 'src/features/heritage/components/About.tsx'],
  ['src/components/HeroFiveSons.tsx', 'src/features/heritage/components/HeroFiveSons.tsx'],
  ['src/components/Admin.tsx', 'src/features/admin/components/Admin.tsx'],
  ['src/components/JoinModal.tsx', 'src/features/onboarding/components/JoinModal.tsx'],
  ['src/lib/supabase.ts', 'src/infrastructure/config/supabaseClient.ts'],
  ['src/utils/google-photos.ts', 'src/infrastructure/api/googlePhotos.api.ts'],
  ['src/data/mock-data.ts', 'src/shared/constants/mock-data.ts'],
];

moves.forEach(([src, dest]) => {
  if (fs.existsSync(src)) {
    fs.renameSync(src, dest);
  }
});

// Cleanup empty dirs
['src/components', 'src/lib', 'src/utils', 'src/data'].forEach(dir => {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
});

let viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})`;
fs.writeFileSync('vite.config.ts', viteConfig);

function injectAlias(file) {
  if (fs.existsSync(file)) {
    let json = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (!json.compilerOptions) json.compilerOptions = {};
    json.compilerOptions.baseUrl = ".";
    json.compilerOptions.paths = { "@/*": ["./src/*"] };
    fs.writeFileSync(file, JSON.stringify(json, null, 2));
  }
}
injectAlias('tsconfig.app.json');
injectAlias('tsconfig.node.json');

const walk = function(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if(file.endsWith('.ts') || file.endsWith('.tsx')) results.push(file);
    }
  });
  return results;
}

const files = walk('src');
const replacements = [
  { from: /['"](\.\.?\/)+data\/mock-data['"]/g, to: "'@/shared/constants/mock-data'" },
  { from: /['"](\.\.?\/)+lib\/supabase['"]/g, to: "'@/infrastructure/config/supabaseClient'" },
  { from: /['"](\.\.?\/)+utils\/google-photos['"]/g, to: "'@/infrastructure/api/googlePhotos.api'" },
  { from: /['"](\.\.?\/)+components\/About['"]/g, to: "'@/features/heritage/components/About'" },
  { from: /['"](\.\.?\/)+components\/HeroFiveSons['"]/g, to: "'@/features/heritage/components/HeroFiveSons'" },
  { from: /['"](\.\.?\/)+components\/Admin['"]/g, to: "'@/features/admin/components/Admin'" },
  { from: /['"](\.\.?\/)+components\/JoinModal['"]/g, to: "'@/features/onboarding/components/JoinModal'" }
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  replacements.forEach(r => {
    content = content.replace(r.from, r.to);
  });
  if (content !== original) {
    fs.writeFileSync(file, content);
  }
});

console.log("Refactoring complete!");
