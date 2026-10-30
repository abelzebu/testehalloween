// Junta template + fotos num index.html único (offline)
const fs = require('fs');
const path = require('path');
const dir = __dirname;
const b64 = (f, tipo) => `data:${tipo};base64,` + fs.readFileSync(path.join(dir, f)).toString('base64');
const html = fs.readFileSync(path.join(dir, 'template.html'), 'utf8')
  .replace('__LULA__', b64('lula.jpg', 'image/jpeg'))
  .replace('__VICE__', b64('alckmin.jpg', 'image/jpeg'))
  .replace('__SOM_TECLA__', b64('tecla.mp3', 'audio/mpeg'))
  .replace('__SOM_CONFIRMA__', b64('confirma.mp3', 'audio/mpeg'));
fs.writeFileSync(path.join(dir, '..', 'index.html'), html);
console.log('index.html gerado');
