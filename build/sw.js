if ('function' === typeof importScripts) {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
  );
  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');

    // self.addEventListener('install', event => {
    //   self.skipWaiting();
    // });

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([
  {
    "url": "favicon.png",
    "revision": "47e35bc4f7cae02b5c598a1460ad887b"
  },
  {
    "url": "images/apple-touch-icon.png",
    "revision": "6c07c1df9e1da241d464b8a073b28df1"
  },
  {
    "url": "images/icons-192.png",
    "revision": "a7aa70fbdc6606b9dfe606137d16ea5b"
  },
  {
    "url": "images/icons-512.png",
    "revision": "04f32125a09bd49de0e53fa24c1492d1"
  },
  {
    "url": "index.html",
    "revision": "999ac06c5d2807644ae634a17f36b00a"
  },
  {
    "url": "precache-manifest.0165ba4ed1c3956762f272bd6ede41a2.js",
    "revision": "0165ba4ed1c3956762f272bd6ede41a2"
  },
  {
    "url": "service-worker.js",
    "revision": "cc0b55d960f420916497ad0ce8531a5b"
  },
  {
    "url": "static/css/main.987551db.chunk.css",
    "revision": "dd444c628bc0d5372ec8c3804a845447"
  },
  {
    "url": "static/js/2.7e5f80bf.chunk.js",
    "revision": "e594ffda1ee5654105a68fbe247edc01"
  },
  {
    "url": "static/js/main.9704f414.chunk.js",
    "revision": "1418beb26665c36c980899a47db780a6"
  },
  {
    "url": "static/js/runtime~main.a8a9905a.js",
    "revision": "238c9148d722c1b6291779bd879837a1"
  }
]);

    /* custom cache rules*/
    workbox.routing.registerRoute(
      new RegExp('/static/media.*/'),
      new workbox.strategies.CacheFirst()
    );

    workbox.routing.registerRoute(
      new RegExp('/static/css.*/'),
      new workbox.strategies.NetworkFirst()
    );

    workbox.routing.registerRoute(
      new RegExp('/static/js.*/'),
      new workbox.strategies.NetworkFirst()
    );

    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg)$/,
      workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          }),
        ],
      })
    );

  } else {
    console.log('Workbox could not be loaded. No Offline support');
  }
}