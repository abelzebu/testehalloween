// Guarda o app no aparelho na primeira visita; depois funciona offline.
// Ao mudar algum arquivo, suba a versão pra forçar a atualização.
const VERSAO = 'urna-v1';
const ARQUIVOS = ['./', './index.html', './manifest.json', './icones/icone-192.png', './icones/icone-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSAO).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== VERSAO).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request)));
});
