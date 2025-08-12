import { copyFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const src = resolve(process.cwd(), 'public', 'robots.txt');
const dest = resolve(process.cwd(), 'dist', 'robots.txt');

if (existsSync(src)) {
  copyFileSync(src, dest);
  console.log('Copied robots.txt to dist');
} else {
  console.warn('robots.txt not found in public');
} 