'use strict';
const fs   = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const ejs  = require('ejs');

const ROOT   = __dirname;
const DOCS   = path.join(ROOT, 'docs');
const PUBLIC = path.join(ROOT, 'public');

const CONFIG_NAME = fs.existsSync(path.join(ROOT, 'config.prod.yml')) ? 'config.prod.yml' : 'config.yml';
const config = yaml.load(fs.readFileSync(path.join(ROOT, CONFIG_NAME), 'utf8'));

fs.rmSync(DOCS, { recursive: true, force: true });
fs.mkdirSync(DOCS, { recursive: true });

const template = fs.readFileSync(path.join(ROOT, 'views', 'index.ejs'), 'utf8');
const html = ejs.render(template, { config }, { filename: path.join(ROOT, 'views', 'index.ejs') });
fs.writeFileSync(path.join(DOCS, 'index.html'), html);

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    entry.isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d);
  }
}
copyDir(PUBLIC, DOCS);

console.log('Build complete → docs/');
console.log('Open docs/index.html in a browser, or deploy the docs/ folder to GitHub Pages.');
