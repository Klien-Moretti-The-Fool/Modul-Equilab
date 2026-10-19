#!/usr/bin/env node
// EQUILAB organizer. Local files only; no downloads, Git operations or publishing.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import {createRequire} from 'node:module';
import {spawnSync} from 'node:child_process';

const root=fs.realpathSync(process.cwd()),args=process.argv.slice(2);
const marker='docs/ORGANIZED-PROJECT.json';
const normalize=p=>p.split(path.sep).join('/');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const read=p=>fs.readFileSync(path.join(root,p),'utf8').replace(/^\uFEFF/,'');
const exists=p=>fs.existsSync(path.join(root,p));
const skipName=name=>['node_modules','dist','.git'].includes(name)||name.startsWith('.equilab-stage-')||/^backup-v/.test(name)||/\.backup-/.test(name);
const fail=message=>{throw Error(message);};
const validPath=p=>typeof p==='string'&&!path.isAbsolute(p)&&!p.split(/[\\/]/).includes('..')&&!p.startsWith('.git/')&&!p.startsWith('node_modules/')&&!p.startsWith('.env');
const knownLegacy={"src/components/auth/LoginModal.jsx":"80e8bb3e3738dabbadf1b71a36771752d718d2a4cffada6c4e5cdda8e2ccb5cb","src/components/auth/RegisterModal.jsx":"495b0f15f16e48d5e7c48965a38fe829c5c14eaf904f5b5df690b8c7213a0256","src/components/elab/DynamicEquilibriumSim.jsx":"74a290c134575a7ed788cf5c584b12b076c33285287ca2cd10cfe5e984ba8464","src/components/elab/ELabPage.jsx":"5ac45ca0919d319d1d0927f486ff1a2004e32eb1700011c8ef8692202358e5e1","src/components/elab/FeedbackPanel.jsx":"89246a9198a01310e9691692f33a862aec2ea2cd1fcd7b51bf4988812db0ce2b","src/components/elab/IonizationSim.jsx":"a58677f161f0e7288932005e594f55a5db5be584ce4c479b5ce22dd971b1a66c","src/components/elab/LeChatelierSim.jsx":"66c7a5fdc6a65dc9f6d22fb72606d5f7ae939b1aaca22b7ae1ed0c53523ebdb3","src/components/elab/SimulationGrid.jsx":"08f9c69eb739b9a29ab4c9da565375e88696f49b8b2fda357cd55e497bdd2d46","src/components/elab/TitrationSim.jsx":"dbd44e1f642b6825bb70f5fe5d37516f3da6bac46754c736fd73ecd2df7a8974","src/components/home/CTASection.jsx":"04c70a7a79b2bc78e3247c29dfe8dc865869171d29756e1abe7c637ea99cc829","src/components/home/FeatureHighlights.jsx":"b3894ca1042b71359d4db5bbd7f8ea36441d7d215c43efe2a79446dd1de4988e","src/components/home/HeroSection.jsx":"86f00e8e2d28892573583fc636cc70283b2350dfc494467a20ce687084de5064","src/components/home/IntroSection.jsx":"e74aefd27e186a76758284b3f097c9351b738207e207b08b301972f24edc0697","src/components/home/NotesPreview.jsx":"cb5f34b94490262bdec1cd06146cddf8310bd4d8eb62c800e1a3ed1e31ff9b99","src/components/home/QuizPreview.jsx":"fc5b0be32c778eb1e64b71fd60fbf1d80263140b61d3e52039caaf72c9c7111e","src/components/home/SimulationPreview.jsx":"58f34131daf588fd0ae711effa292e72cafbe397e3f7fc16c3a1a3fd5f797c50","src/components/layout/Footer.jsx":"7b8aa958931a6eb4f35d8e7aef32e15a2769c226881b3e2268b5c5b63ee394f1","src/components/layout/Navbar.jsx":"96258deabc797e4ab396034e7763627146eed21ab03f2e1bb578d2a23dffaf5a","src/components/layout/PageWrapper.jsx":"c242bf9b2b5502111434e640a79228146aba9a8f35d1dec4673aab9046fac5c8","src/components/notes/MisconceptionAlert.jsx":"b6674b52c486615242fc3eea869a127bdee07ac17272c07acdc39596bf51ed7a","src/components/notes/NoteContentPanel.jsx":"e7af6cc8b95c5072e273e9f96a5d692dd6fa0807f2e261dcbdc033ad11e96e6c","src/components/notes/NoteTopicCard.jsx":"cd7343b04547db701cf495dcb4febd6df7a5597ef3e2d0b411bd976e8befdcf4","src/components/notes/NotesCarousel.jsx":"d34f74f79df214a37a2267f902ae6e6c8d4d7f039c4695a83b1646575a26ac73","src/components/notes/NotesPage.jsx":"56aa91a71f3c610ef88d9925883e51964cd24b332354f81a0bda3753aa73aae9","src/components/notes/SummaryBox.jsx":"2321d5cfb576b6a3e4ffa4df620a550dfebc171f0fe3d099ff2ee214838094ac","src/components/quiz/QuizFeedbackCard.jsx":"bead30b13c03608b17e424adc01895423a37d3808ed67c5d8f40424b81816c3e","src/components/quiz/QuizIntroCard.jsx":"24693741279451e11e3b411e3ed3ec4cd5f80cefcd50c62e8021d04594ed2c1c","src/components/quiz/QuizPage.jsx":"94ab74f7df006da3ce70a75a0684c9f4c0feb362b96adca40dc39fe95c58ebc4","src/components/quiz/QuizQuestionCard.jsx":"40f1c6c9fc0f651adc99995c9bbb0f689c800dc06619190b99e6485fff28e865","src/components/quiz/QuizResultCard.jsx":"4b427490a6286546899d0e02f994776b3a021a059fcd48934c8d7eef097dbe1d","src/components/ui/GlassCard.jsx":"cf194807aa2e3d3ea05e9ed248e84191bf1fc287c4f6f3a913d902f2293bc230","src/components/ui/GlowButton.jsx":"99f443170d6d3d27622dd22d4a5098fe32bb65e5e50cd29d2b4b6dd375b37bc7","src/components/ui/HeroBadge.jsx":"a0e45885708b7f6df4e562d5069bdcbc48bcedef9cd1cc366c287434cb09e8ee","src/components/ui/ProgressBar.jsx":"3e0be5050c386386863251f906e8007f8e7338e80031fabc512b0d061f204670","src/components/ui/SectionTitle.jsx":"357d901c674dc9fcb6e2d2e6f131f5e2532851aa81846196c16bbe4ec59491a0","src/data/notesData.js":"179d7ba93fa203ad473b82ce3b6b6f5e41899ee867bf7cea69deea385fc80ca6","src/data/quizData.js":"e7f1e983a0861c763f18266af3814596dbb534031a0c9d0f87573533a221d08b","src/data/simulationsData.js":"a7c4f7a157cbb4961765e3c8e7ac4af278ae48a2c62fb3fbb302b02e2daaf81c"};

function filesBelow(base,relative=''){
 const result=[],absolute=path.join(base,relative);
 if(!fs.existsSync(absolute))return result;
 for(const entry of fs.readdirSync(absolute,{withFileTypes:true})){
  if(skipName(entry.name))continue;
  const next=normalize(path.join(relative,entry.name));
  if(entry.isSymbolicLink())fail('Pautan simbolik ditemui: '+next+'. Tiada fail projek diubah.');
  if(entry.isDirectory())result.push(...filesBelow(base,next));else if(entry.isFile())result.push(next);
 }
 return result;
}
function writeFile(base,file,content){const p=path.join(base,file);fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,content);}
function removeEmpty(base,relative){let dir=path.dirname(path.join(base,relative));while(dir!==base&&dir.startsWith(base+path.sep)){if(!fs.existsSync(dir)||fs.readdirSync(dir).length)break;fs.rmdirSync(dir);dir=path.dirname(dir);}}
function restoreBackup(backup,automatic=false){
 const data=JSON.parse(fs.readFileSync(path.join(backup,'restore.json'),'utf8'));
 if(fs.realpathSync(data.root)!==root)fail('Sandaran ini milik folder projek yang berbeza.');
 for(const item of data.files){
  if(!validPath(item.file))fail('Laluan sandaran tidak sah.');
  if(item.before!==null&&hash(fs.readFileSync(path.join(backup,'original',item.file)))!==item.before)fail('Fail sandaran rosak: '+item.file);
  if(!automatic){const current=exists(item.file)?hash(fs.readFileSync(path.join(root,item.file))):null;if(current!==item.after)fail('Ada suntingan selepas penyusunan: '+item.file+'. Pemulihan automatik dihentikan untuk menjaga suntingan itu.');}
 }
 for(const item of data.files){
  const target=path.join(root,item.file);
  if(item.before!==null){fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(path.join(backup,'original',item.file),target);}
  else if(fs.existsSync(target))fs.unlinkSync(target);
 }
 for(const item of data.files.filter(x=>x.before===null))removeEmpty(root,item.file);
 for(const item of (data.previousBackups??[]).slice().reverse())if(fs.existsSync(path.join(backup,item.saved))){if(fs.existsSync(path.join(root,item.original)))fail('Lokasi sandaran lama sudah digunakan: '+item.original);fs.mkdirSync(path.dirname(path.join(root,item.original)),{recursive:true});fs.renameSync(path.join(backup,item.saved),path.join(root,item.original));}
 console.log('BERJAYA: struktur asal dipulihkan.');
}
function npmCli(){
 const candidates=[process.env.npm_execpath,path.join(path.dirname(process.execPath),'node_modules/npm/bin/npm-cli.js')].filter(Boolean);
 const where=spawnSync(process.platform==='win32'?'where.exe':'which',[process.platform==='win32'?'npm.cmd':'npm'],{encoding:'utf8'});
 for(const value of (where.stdout??'').trim().split(/\r?\n/).filter(Boolean)){
  if(fs.existsSync(value)){const actual=fs.realpathSync(value);candidates.push(actual,path.join(path.dirname(value),'node_modules/npm/bin/npm-cli.js'));}
 }
 const cli=candidates.find(p=>p.endsWith('npm-cli.js')&&fs.existsSync(p));
 if(!cli)fail('npm tidak ditemui. Pasang Node.js bersama npm dahulu. Tiada fail projek diubah.');
 return cli;
}

async function organize(){
 if(args[0]==='--restore'){if(!args[1])fail('Gunakan: node susun-equilab.mjs --restore "LOKASI_SANDARAN"');restoreBackup(path.resolve(args[1]));return;}
 if(args.some(x=>x!=='--check'))fail('Pilihan: --check atau --restore "LOKASI_SANDARAN"');
 if(!exists('package.json')||!exists('src/main.jsx'))fail('Buka terminal dalam folder EQUILAB yang mempunyai package.json dan src/main.jsx.');
 if(exists(marker)){console.log('Projek sudah tersusun. Baca docs/PROJECT-MAP.md. Tiada perubahan dibuat.');return;}
 const required=['App.jsx','GuidePage.jsx','ModuleVideos.jsx','videoLibrary.js','LabWorkbench.jsx','Accounts.jsx'];
 for(const file of required)if(!exists('src/redesign/'+file))fail('Struktur V10 tidak lengkap: '+file+'. Gunakan projek V10 atau hantar ZIP terkini untuk disemak. Tiada fail projek diubah.');
 const require=createRequire(path.join(root,'package.json'));
 let parser,traverse,generate,t,postcss,esbuild;
 try{parser=require('@babel/parser');traverse=require('@babel/traverse').default;generate=require('@babel/generator').default;t=require('@babel/types');postcss=require('postcss');esbuild=require('esbuild');}catch{fail('Dependency diperlukan. Jalankan npm.cmd install dalam projek ini, kemudian cuba semula. Tiada fail projek diubah.');}
 const cli=npmCli();
 const parse=(code,file)=>{try{return parser.parse(code,{sourceType:'unambiguous',plugins:['jsx','importMeta','dynamicImport','topLevelAwait'],sourceFilename:file});}catch(e){fail('Kod tidak dapat dibaca: '+file+' — '+e.message);}};
 const jsFiles=filesBelow(root,'src').concat(filesBelow(root,'tests'),['set-video.mjs']).filter(f=>/\.(?:jsx?|mjs)$/.test(f)&&exists(f));
 const mapping=new Map();
 const assign=(name,dest)=>mapping.set('src/redesign/'+name,dest);
 assign('App.jsx','src/App.jsx');assign('GuidePage.jsx','src/pages/GuidePage.jsx');assign('PageHeader.jsx','src/components/PageHeader.jsx');
 for(const name of ['NoteStudio.jsx','TheoryExplorer.jsx','SkuExplorer.jsx','IllustratedModuleCard.jsx'])assign(name,'src/features/modules/'+name);
 for(const name of ['Lab.jsx','LabWorkbench.jsx','LabApparatus.jsx','LabVisuals.jsx','GuidedExperiment.jsx','labActivities.js','labModels.js'])assign(name,'src/features/labs/'+name);
 assign('ModuleVideos.jsx','src/features/modules/ModuleVideoPanel.jsx');assign('Accounts.jsx','src/features/accounts/Accounts.jsx');
 for(const name of ['content.js','skuTopics.js','guideData.js','videoLibrary.js','videoOverrides.json'])assign(name,'src/data/'+name);
 assign('moduleVideos.js','src/data/legacyVideoLinks.js');
 for(const name of ['chemistry.js','cloud.js','learningProgress.js'])assign(name,'src/lib/'+name);
 for(const name of fs.readdirSync(path.join(root,'src/redesign')))if(name.endsWith('.css'))assign(name,'src/styles/'+name);
 for(const file of mapping.keys())if(!exists(file))fail('Fail tidak lengkap: '+file+'. Tiada fail projek diubah.');

 function resolveLocal(from,spec){
  const plain=spec.split(/[?#]/)[0];if(!plain.startsWith('.'))return null;
  const base=normalize(path.posix.normalize(path.posix.join(path.posix.dirname(from),plain)));
  for(const candidate of [base,...['.js','.jsx','.mjs','.json','.css','.ts','.tsx'].map(e=>base+e),base+'/index.js',base+'/index.jsx']){
   const dir=path.join(root,path.posix.dirname(candidate));
   if(fs.existsSync(dir)&&fs.readdirSync(dir).includes(path.posix.basename(candidate))&&fs.statSync(path.join(root,candidate)).isFile())return candidate;
  }
  fail('Import tidak ditemui: '+from+' → '+spec+'. Tiada fail projek diubah.');
 }
 const dependencies=new Map();
 for(const file of jsFiles){
  const ast=parse(read(file),file),deps=[];
  traverse(ast,{
   ImportDeclaration(p){if(p.node.source.value.startsWith('.'))deps.push(resolveLocal(file,p.node.source.value));},
   ExportNamedDeclaration(p){if(p.node.source?.value.startsWith('.'))deps.push(resolveLocal(file,p.node.source.value));},
   ExportAllDeclaration(p){if(p.node.source.value.startsWith('.'))deps.push(resolveLocal(file,p.node.source.value));},
   CallExpression(p){if(p.node.callee.type==='Import'){if(!t.isStringLiteral(p.node.arguments[0]))fail('Import dinamik perlu disemak secara manual: '+file);const spec=p.node.arguments[0].value;if(spec.startsWith('.'))deps.push(resolveLocal(file,spec));}if(t.isMemberExpression(p.node.callee)&&p.node.callee.property.name==='glob')fail('import.meta.glob perlu disemak secara manual: '+file);}
  });dependencies.set(file,deps);
 }
 const customRoots=jsFiles.filter(file=>!Object.hasOwn(knownLegacy,file)||hash(Buffer.from(read(file).replace(/\r\n/g,'\n')))!==knownLegacy[file]);
 const reached=new Set(),pending=['src/main.jsx',...customRoots,...jsFiles.filter(x=>x.startsWith('tests/')), 'set-video.mjs'];
 while(pending.length){const f=pending.pop();if(reached.has(f))continue;reached.add(f);pending.push(...(dependencies.get(f)??[]));}
 const retired=new Set();
 for(const [file,expected]of Object.entries(knownLegacy))if(exists(file)&&hash(Buffer.from(read(file).replace(/\r\n/g,'\n')))===expected&&!reached.has(file))retired.add(file);
 const extraRedesign=filesBelow(root,'src/redesign').filter(f=>!mapping.has(f));
 // Unknown files are kept; known unreachable legacy files are retained in the external backup.
 for(const file of extraRedesign)if(!/\.backup-/.test(file))console.log('Fail tambahan dikekalkan:',file);

 const generated=new Map();
 const origin='src/redesign/App.jsx',appAst=parse(read(origin),origin);
 const bridge=parse(read('src/App.jsx'),'src/App.jsx').program.body;
 if(bridge.length!==1||!t.isExportNamedDeclaration(bridge[0])||!bridge[0].source||resolveLocal('src/App.jsx',bridge[0].source.value)!==origin)fail('src/App.jsx mempunyai kod tambahan. Skrip dihentikan untuk menjaga kod tersebut. Tiada fail projek diubah.');
 const outer=appAst.program.body.find(n=>t.isExportDefaultDeclaration(n)&&t.isFunctionDeclaration(n.declaration)&&n.declaration.id?.name==='App');
 if(!outer)fail('Fungsi App berbeza daripada struktur yang disokong. Tiada fail projek diubah.');
 const originalImports=appAst.program.body.filter(n=>t.isImportDeclaration(n));
 const shared=appAst.program.body.filter(n=>!t.isImportDeclaration(n)&&n!==outer&&!['Lesson','Quiz'].includes(n.id?.name));
 if(shared.some(n=>!t.isVariableDeclaration(n)&&!t.isFunctionDeclaration(n)))fail('Kod tambahan pada aras App perlu disemak dahulu. Tiada fail projek diubah.');
 const sharedNames=shared.flatMap(n=>Object.keys(t.getBindingIdentifiers(n)));
 appAst.program.body=appAst.program.body.filter(n=>!shared.includes(n));
 const sharedImport=()=>t.importDeclaration(sharedNames.map(n=>t.importSpecifier(t.identifier(n),t.identifier(n))),t.stringLiteral('@organized/src/lib/appShared.js'));
 appAst.program.body.unshift(sharedImport());
 const extraImports=[];
 function importComponent(name,file){const node=t.importDeclaration([t.importDefaultSpecifier(t.identifier(name))],t.stringLiteral('@organized/'+file));appAst.program.body.unshift(node);extraImports.push(node);}
 function moduleProgram(node,file){
  const own=node.id.name;
  const imports=[...originalImports.filter(n=>n.specifiers.length),sharedImport(),...extraImports].map(n=>t.cloneNode(n,true));
  for(const n of imports)n.specifiers=n.specifiers.filter(s=>s.local.name!==own);
  const ast=t.file(t.program([...imports.filter(n=>n.specifiers.length),t.exportDefaultDeclaration(t.cloneNode(node,true))]));
  generated.set(file,{ast,origin});
 }
 for(const [name,file]of [['Quiz','src/features/quiz/Quiz.jsx'],['Lesson','src/features/modules/Lesson.jsx']]){
  const node=appAst.program.body.find(n=>t.isFunctionDeclaration(n)&&n.id?.name===name);
  if(!node)fail('Fungsi '+name+' tidak ditemui. Tiada fail projek diubah.');
  appAst.program.body=appAst.program.body.filter(n=>n!==node);moduleProgram(node,file);importComponent(name,file);
 }
 for(const [name,file]of [['ModuleCard','src/features/modules/ModuleCard.jsx'],['Home','src/pages/HomePage.jsx'],['Dashboard','src/pages/ProgressPage.jsx']]){
  let appPath;traverse(appAst,{FunctionDeclaration(p){if(p.node===outer.declaration)appPath=p;}});appPath.scope.crawl();
  const fun=appPath.get('body.body').find(p=>p.isFunctionDeclaration()&&p.node.id.name===name);
  if(!fun)fail('Fungsi '+name+' berbeza. Tiada fail projek diubah.');
  const captures=new Set();
  fun.traverse({ReferencedIdentifier(p){const b=p.scope.getBinding(p.node.name);if(b?.scope===appPath.scope)captures.add(p.node.name);},JSXOpeningElement(p){if(t.isJSXIdentifier(p.node.name)){const b=p.scope.getBinding(p.node.name.name);if(b?.scope===appPath.scope)captures.add(p.node.name.name);}}});
  const binding=appPath.scope.getBinding(name);
  for(const ref of binding.referencePaths){
   if(ref.parentPath.isJSXClosingElement())continue;
   if(!ref.parentPath.isJSXOpeningElement())fail(name+' digunakan selain sebagai komponen. Tiada fail projek diubah.');
   const opening=ref.parentPath.node;
   for(const capture of captures)if(!opening.attributes.some(a=>t.isJSXAttribute(a)&&a.name.name===capture))opening.attributes.push(t.jsxAttribute(t.jsxIdentifier(capture),t.jsxExpressionContainer(t.identifier(capture))));
  }
  const node=t.cloneNode(fun.node,true);
  if(!node.params.length)node.params=[t.objectPattern([])];
  if(node.params.length!==1||!t.isObjectPattern(node.params[0])||node.params[0].properties.some(p=>t.isRestElement(p)))fail('Parameter '+name+' perlu disemak secara manual. Tiada fail projek diubah.');
  const locals=new Set(Object.keys(t.getBindingIdentifiers(node.params[0])));
  for(const capture of captures)if(!locals.has(capture))node.params[0].properties.push(t.objectProperty(t.identifier(capture),t.identifier(capture),false,true));
  fun.remove();moduleProgram(node,file);importComponent(name,file);
 }
 generated.set('src/lib/appShared.js',{ast:t.file(t.program([...originalImports.filter(n=>n.specifiers.length).map(n=>t.cloneNode(n,true)),...shared.map(n=>t.exportNamedDeclaration(t.cloneNode(n,true)))])),origin});
 generated.set('src/App.jsx',{ast:appAst,origin});

 function link(from,to){let relative=path.posix.relative(path.posix.dirname(from),to);return relative.startsWith('.')?relative:'./'+relative;}
 function convertSpecifier(value,oldFile,newFile){
  if(value.startsWith('@organized/'))return link(newFile,value.slice('@organized/'.length));
  if(!value.startsWith('.'))return value;
  const target=resolveLocal(oldFile,value),suffix=value.slice(value.split(/[?#]/)[0].length);
  return link(newFile,mapping.get(target)??target)+suffix;
 }
 function rewriteAst(ast,oldFile,newFile){
  traverse(ast,{
   ImportDeclaration(p){p.node.source.value=convertSpecifier(p.node.source.value,oldFile,newFile);delete p.node.source.extra;},
   ExportNamedDeclaration(p){if(p.node.source){p.node.source.value=convertSpecifier(p.node.source.value,oldFile,newFile);delete p.node.source.extra;}},
   ExportAllDeclaration(p){p.node.source.value=convertSpecifier(p.node.source.value,oldFile,newFile);delete p.node.source.extra;},
   StringLiteral(p){if(mapping.has(p.node.value)){p.node.value=mapping.get(p.node.value);delete p.node.extra;}}
  });
 }
 function prune(ast){
  traverse(ast,{Program(p){p.scope.crawl();for(const entry of p.get('body'))if(entry.isImportDeclaration()&&entry.node.specifiers.length){for(const s of entry.get('specifiers'))if(!p.scope.getBinding(s.node.local.name)?.referenced)s.remove();if(!entry.node.specifiers.length)entry.remove();}}});
 }
 function printable(ast){
  const original=generate(ast,{comments:true}).code;
  const formatted=t.cloneNode(ast,true);let touched=false;
  function space(p){
   const children=p.node.children;
   if(!children.length||children.some(n=>t.isJSXText(n)))return;
   let depth=1,at=p.parentPath;while(at){if(at.isJSXElement()||at.isJSXFragment())depth++;at=at.parentPath;}
   p.node.children=children.flatMap(n=>[t.jsxText('\n'+'  '.repeat(depth+1)),n]).concat(t.jsxText('\n'+'  '.repeat(depth)));touched=true;
  }
  traverse(formatted,{JSXElement:{exit:space},JSXFragment:{exit:space}});
  if(!touched)return original+'\n';
  const result=generate(formatted,{comments:true}).code,options={loader:'jsx',jsx:'transform',minifyWhitespace:true};
  // Add readable JSX line breaks only if compilation produces identical code.
  return (esbuild.transformSync(original,options).code===esbuild.transformSync(result,options).code?result:original)+'\n';
 }
 const outputs=new Map(),deletions=new Set(retired);
 for(const [file,newFile]of mapping){
  if(file==='src/redesign/App.jsx'){deletions.add(file);continue;}
  if(file.endsWith('.css')){
   const css=postcss.parse(read(file));
   css.walkDecls(d=>{d.value=d.value.replace(/url\(\s*(['"]?)([^'"\)]+)\1\s*\)/g,(whole,q,url)=>url.startsWith('.')?'url('+q+convertSpecifier(url,file,newFile)+q+')':whole);});
   css.walkAtRules('import',r=>{r.params=r.params.replace(/^(['"])([^'"]+)\1/,(all,q,s)=>s.startsWith('.')?q+convertSpecifier(s,file,newFile)+q:all);});
   css.walk(n=>{let depth=0,p=n.parent;while(p&&p.type!=='root'){depth++;p=p.parent;}const pad='  '.repeat(depth);n.raws.before=(depth?'\n':'\n\n')+pad;if(n.type==='decl')n.raws.between=': ';if(n.nodes){n.raws.between=' ';n.raws.after='\n'+pad;n.raws.semicolon=true;}});
   outputs.set(newFile,Buffer.from(css.toString().trim()+'\n'));
  }else if(file.endsWith('.json'))outputs.set(newFile,fs.readFileSync(path.join(root,file)));
  else{const ast=parse(read(file),file);rewriteAst(ast,file,newFile);outputs.set(newFile,Buffer.from(printable(ast)));}
  deletions.add(file);
 }
 for(const [file,item]of generated){rewriteAst(item.ast,item.origin,file);prune(item.ast);outputs.set(file,Buffer.from(printable(item.ast)));}
 for(const file of jsFiles.filter(f=>!mapping.has(f)&&!retired.has(f)&&!generated.has(f))){
  if(file==='src/App.jsx')continue;
  const ast=parse(read(file),file);rewriteAst(ast,file,file);let code=printable(ast);
  if(file==='tests/videos.test.js')code=code.replaceAll('src/redesign','src/data').replaceAll('moduleVideos.js','legacyVideoLinks.js');
  if(file==='tests/import-resolution.test.js'){
   // Preserve the original test and its assertions, and scan each directory below src.
   code=code.replaceAll('../src/redesign','../src').replace('fs.readdirSync(dir).filter(',"fs.readdirSync(dir, { recursive: true }).filter(");
   code=code.replace('path.parse(f).name.toLowerCase() === specifier.toLowerCase()',"path.dirname(f) === path.dirname(file) && path.parse(f).name.toLowerCase() === specifier.toLowerCase()");
  }
  outputs.set(file,Buffer.from(code));
 }
 // Every former release document is retained as documentation, separate from live code.
 const docs=filesBelow(root,'docs').filter(f=>!f.startsWith('docs/archive/'));
 for(const file of [...docs,...fs.readdirSync(root).filter(n=>/^README-(?:V\d|MULA)/.test(n))]){
  const dest='docs/archive/'+file.replace(/^docs\//,'');
  if(exists(dest))fail('Lokasi arkib sudah digunakan: '+dest+'. Tiada fail projek diubah.');
  outputs.set(dest,fs.readFileSync(path.join(root,file)));deletions.add(file);
 }
 for(const file of ['install.mjs','update-manifest.json'])if(exists(file)){outputs.set('docs/archive/installers/'+file+'.txt',fs.readFileSync(path.join(root,file)));deletions.add(file);}
 const newTargets=new Set([...mapping.values(),...generated.keys()]);
 for(const dest of outputs.keys())if(exists(dest)&&newTargets.has(dest)&&dest!=='src/App.jsx')fail('Fail destinasi sudah wujud: '+dest+'. Tiada fail projek diubah.');
 const mapText=`# Peta kod EQUILAB\n\nProjek aktif menggunakan satu struktur folder. Sejarah kod seterusnya boleh disimpan melalui commit Git.\n\n| Lokasi | Kegunaan |\n| --- | --- |\n| src/App.jsx | State aplikasi, akaun, navigasi dan penyelarasan kemajuan |\n| src/pages/HomePage.jsx | Halaman utama dan hero |\n| src/pages/ProgressPage.jsx | Kemajuan, pencapaian dan sejarah kuiz |\n| src/pages/GuidePage.jsx | Panduan, tutorial dan rujukan |\n| src/features/modules/ | Nota, penerokaan konsep, kad modul dan panel video |\n| src/features/quiz/Quiz.jsx | Kuiz, jawapan dan maklum balas |\n| src/features/labs/ | Lima makmal, radas dan aktiviti berpandu |\n| src/features/accounts/ | Akaun, pemulihan kata laluan dan kelas |\n| src/components/PageHeader.jsx | Tajuk halaman dan butang panduan bersama |\n| src/data/ | Kandungan nota, soalan, SKU3073, panduan dan video |\n| src/lib/ | Pengiraan kimia, kemajuan, sambungan akaun dan helper |\n| src/styles/ | CSS mengikut bahagian |\n| public/ | Gambar modul dan tutorial |\n| tests/ | Ujian kod |\n| docs/archive/ | Dokumen keluaran terdahulu; pemasang lama untuk rujukan sahaja |\n\n## Perubahan kandungan\n\n- Nota dan soalan: src/data/content.js dan src/data/skuTopics.js.\n- Video cadangan: src/data/videoLibrary.js.\n- Pautan sendiri: src/data/videoOverrides.json.\n- Pautan lama dikekalkan: src/data/legacyVideoLinks.js.\n- Tukar video melalui terminal seperti biasa: node set-video.mjs buffers \\\"PAUTAN_YOUTUBE\\\".\n- Simulasi: src/features/labs/ dan src/features/modules/NoteStudio.jsx.\n- Model kimia: src/lib/chemistry.js.\n\nSkrip menyusun kod setempat; kandungan nota, formula, pautan video, gambar dan konfigurasi akaun tidak diganti dengan versi muat turun. Nama komponen video ialah ModuleVideoPanel.jsx supaya berbeza jelas daripada fail pautan lama. Import menggunakan sambungan fail yang nyata.\n\nDokumen lama dalam arkib menerangkan laluan versi terdahulu. Gunakan peta ini untuk laluan semasa. Pemasang ZIP lama tidak digunakan selepas projek disusun.\n`;
 outputs.set('docs/PROJECT-MAP.md',Buffer.from(mapText.replaceAll(String.fromCharCode(92),'')));
 const intro='# EQUILAB\n\nE-modul interaktif keseimbangan asid–bes untuk kursus SKU3073.\n\n';
 const existingReadme=exists('README.md')?read('README.md'):intro;
 outputs.set('README.md',Buffer.from(existingReadme+'\n<!-- EQUILAB-ORGANIZED -->\n## Mula di sini\n\nPasang dependency dengan `npm.cmd install` untuk kali pertama. Jalankan `npm.cmd run dev` dan buka alamat Local yang dipaparkan. Selepas laptop ditutup, jalankan semula arahan dev dalam folder yang sama.\n\nPeta fail: [docs/PROJECT-MAP.md](docs/PROJECT-MAP.md). Ujian: `npm.cmd test`. Binaan: `npm.cmd run build`.\n'));
 const ignore=(exists('.gitignore')?read('.gitignore').trimEnd()+'\n':'')+'\n# EQUILAB local dependencies, output and backups\nnode_modules/\ndist/\n.env\n.env.*\n!.env.example\nbackup-*/\n*.backup-*\n*.zip\n*.log\n.equilab-stage-*/\n';
 outputs.set('.gitignore',Buffer.from(ignore));
 outputs.set(marker,Buffer.from(JSON.stringify({format:1,organizedAt:new Date().toISOString(),source:'EQUILAB V10',map:'docs/PROJECT-MAP.md'},null,2)+'\n'));
 for(const file of outputs.keys())deletions.delete(file);
 const changes=[];
 for(const [file,content]of outputs){if(!validPath(file))fail('Laluan tidak sah: '+file);if(!exists(file)||!fs.readFileSync(path.join(root,file)).equals(content))changes.push({file,content});}
 for(const file of deletions)if(exists(file))changes.push({file,content:null});
 const expectedBefore=new Map(changes.map(item=>[item.file,exists(item.file)?hash(fs.readFileSync(path.join(root,item.file))):null]));
 console.log('Pelan: '+mapping.size+' fail dikelaskan; 5 komponen diasingkan; '+retired.size+' fail lama disimpan dalam sandaran.');
 console.log('Nota, video, gambar, .env, dependency dan sejarah Git dikekalkan.');
 if(args.includes('--check')){console.log('SEMAKAN SAHAJA — tiada fail projek diubah.');return;}

 const token=Date.now()+'-'+crypto.randomBytes(3).toString('hex'),stage=path.join(root,'.equilab-stage-'+token);
 let backup,restoreData,committing=false;
 try{
  fs.mkdirSync(stage);
  const stageRoots=['src','public','tests','package.json','package-lock.json','index.html','vite.config.js','vite.config.mjs','postcss.config.js','tailwind.config.js','set-video.mjs',...fs.readdirSync(root).filter(x=>/^\.env(?:\.|$)/.test(x))];
  for(const file of stageRoots)if(exists(file))fs.cpSync(path.join(root,file),path.join(stage,file),{recursive:true,filter:p=>!skipName(path.basename(p))});
  for(const item of changes){if(item.content!==null)writeFile(stage,item.file,item.content);else{const target=path.join(stage,item.file);if(fs.existsSync(target))fs.unlinkSync(target);}}
  const auditFiles=filesBelow(stage,'src').concat(filesBelow(stage,'tests'),['set-video.mjs']).filter(f=>/\.(?:jsx?|mjs)$/.test(f));
  for(const file of auditFiles){const ast=parse(fs.readFileSync(path.join(stage,file),'utf8'),file);traverse(ast,{ImportDeclaration(p){const spec=p.node.source.value;if(spec.startsWith('.')){const target=path.resolve(stage,path.dirname(file),spec);if(!fs.existsSync(target)||!fs.statSync(target).isFile())fail('Import selepas penyusunan tidak sah: '+file+' → '+spec);}},ExportNamedDeclaration(p){if(p.node.source?.value.startsWith('.')){const target=path.resolve(stage,path.dirname(file),p.node.source.value);if(!fs.existsSync(target))fail('Eksport tidak ditemui: '+file);}},ExportAllDeclaration(p){if(p.node.source.value.startsWith('.')&&!fs.existsSync(path.resolve(stage,path.dirname(file),p.node.source.value)))fail('Eksport tidak ditemui: '+file);}});}
  console.log('Menguji struktur baharu dalam ruang sementara...');
  for(const task of ['test','build']){const result=spawnSync(process.execPath,[cli,'run',task],{cwd:stage,stdio:'inherit',env:{...process.env,INIT_CWD:stage}});if(result.status!==0)fail('Semakan '+task+' gagal. Projek asal tidak diubah.');}
  for(const [file,expected]of expectedBefore){const current=exists(file)?hash(fs.readFileSync(path.join(root,file))):null;if(current!==expected)fail('Fail disunting semasa semakan: '+file+'. Suntingan itu dikekalkan. Jalankan semula skrip selepas selesai menyimpan fail.');}
  backup=path.join(path.dirname(root),path.basename(root)+'-sandaran-'+token);fs.mkdirSync(path.join(backup,'original'),{recursive:true});
  restoreData={format:1,root,createdAt:new Date().toISOString(),files:[],previousBackups:[]};
  for(const item of changes){const previous=exists(item.file)?fs.readFileSync(path.join(root,item.file)):null;if(previous!==null)writeFile(path.join(backup,'original'),item.file,previous);restoreData.files.push({file:item.file,before:previous===null?null:hash(previous),after:item.content===null?null:hash(item.content)});}
  writeFile(backup,'restore.json',JSON.stringify(restoreData,null,2)+'\n');
  committing=true;
  for(const item of changes){if(item.content!==null){writeFile(root,item.file,item.content);if(hash(fs.readFileSync(path.join(root,item.file)))!==hash(item.content))fail('Pengesahan salinan gagal: '+item.file);}else fs.unlinkSync(path.join(root,item.file));}
  // Backups from earlier ZIP installers are moved intact to the external backup.
  const oldBackups=[];
  function scanBackups(dir,relative=''){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const f=normalize(path.join(relative,e.name));if(e.name.startsWith('.equilab-stage-')||['node_modules','dist','.git'].includes(e.name))continue;if(/^backup-v/.test(e.name)||/\.backup-/.test(e.name)){oldBackups.push(f);continue;}if(e.isDirectory())scanBackups(path.join(dir,e.name),f);}}
  scanBackups(root);
  for(const original of oldBackups){const saved='sandaran-terdahulu/'+original;fs.mkdirSync(path.dirname(path.join(backup,saved)),{recursive:true});fs.renameSync(path.join(root,original),path.join(backup,saved));restoreData.previousBackups.push({original,saved});writeFile(backup,'restore.json',JSON.stringify(restoreData,null,2)+'\n');}
  for(const item of changes.filter(x=>x.content===null))removeEmpty(root,item.file);
  console.log('\nBERJAYA: projek EQUILAB telah disusun.');console.log('Sandaran asal: '+backup);console.log('Baca README.md dan docs/PROJECT-MAP.md.');console.log('Jalankan npm.cmd run dev, kemudian Ctrl+Shift+R dalam Chrome.');
  console.log('Jika perlu pulihkan: node "'+process.argv[1]+'" --restore "'+backup+'"');
 }catch(error){
  if(committing){try{restoreBackup(backup,true);console.error('Perubahan dipulihkan selepas kegagalan. Sandaran: '+backup);}catch(recovery){console.error('Pemulihan memerlukan semakan: '+recovery.message+'\nSandaran: '+backup);}}
  throw error;
 }finally{if(fs.existsSync(stage))fs.rmSync(stage,{recursive:true,force:true});}
}
organize().catch(error=>{console.error('\nDIHENTIKAN: '+error.message);process.exitCode=1;});
