if ('function' === typeof importScripts) {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
  );
  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');

    self.addEventListener('install', event => {
      self.skipWaiting();
    });

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
    "revision": "55cc1c9c2b259d7f9ac3c14c23f51774"
  },
  {
    "url": "precache-manifest.c970ee3c9ae7383bf74f830a73347e3d.js",
    "revision": "c970ee3c9ae7383bf74f830a73347e3d"
  },
  {
    "url": "service-worker.js",
    "revision": "4a0ae20851bc28ab8c9d14bd8e0625b4"
  },
  {
    "url": "static/css/main.f91424b5.chunk.css",
    "revision": "f71e7a2f68acf4dc7e3d85f26e828528"
  },
  {
    "url": "static/js/2.81eee17b.chunk.js",
    "revision": "462fb3e65d0b7b04a782b7873ce13414"
  },
  {
    "url": "static/js/main.68710a0f.chunk.js",
    "revision": "6257fbde37896398231a22c738473742"
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