'use strict';
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = relative => {
  const full=path.resolve(root,relative);
  if(!full.startsWith(root+path.sep))throw new Error('Asset must stay inside the project');
  return fs.readFileSync(full,'utf8');
};
let html=read('index.html');
// Accept either attribute order, defer="", and self-closing link tags.
html=html.replace(/<link\b[^>]*>/gi,tag=>{
  const href=tag.match(/\bhref=["']([^"']+)["']/i)?.[1];
  const rel=tag.match(/\brel=["']([^"']+)["']/i)?.[1];
  if(rel==='stylesheet'&&href)return `<style>\n${read(href)}\n</style>`;
  if(rel==='icon'&&href==='assets/favicon.svg')return tag.replace(href,`data:image/svg+xml,${encodeURIComponent(read(href))}`);
  return tag;
});
const scripts=[];
html=html.replace(/<script\b([^>]*)>\s*<\/script>/gi,(tag,attrs)=>{
  const src=attrs.match(/\bsrc=["']([^"']+)["']/i)?.[1];
  if(!src)return tag;
  scripts.push(`<script>\n${read(src).replace(/<\/script/gi,'<\\/script')}\n</script>`);
  return '';
});
if(scripts.length<8)throw new Error('Unexpected script count; refusing an incomplete portable build');
html=html.replace('</body>',()=>scripts.join('\n')+'\n</body>');
const dest=path.join(root,'RAM-Lab-Standalone.html');
fs.writeFileSync(dest,html);
console.log(`Built ${dest} (${Buffer.byteLength(html)} bytes, ${scripts.length} scripts)`);
