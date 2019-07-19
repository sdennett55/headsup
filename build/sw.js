if ('function' === typeof importScripts) {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
  );
  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');

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
    "revision": "34b1137913f6407d48258ff9c3f22b0d"
  },
  {
    "url": "precache-manifest.a7e31c4a01236b24a40955bddbcf76b4.js",
    "revision": "a7e31c4a01236b24a40955bddbcf76b4"
  },
  {
    "url": "service-worker.js",
    "revision": "cf8ed1e9d2692123c9928c15dfb4c58e"
  },
  {
    "url": "static/css/main.c3ffff0c.chunk.css",
    "revision": "c51df678814b924915352c6a369e2e73"
  },
  {
    "url": "static/js/2.92ae3777.chunk.js",
    "revision": "b59d445f761b678d93e7d6504fee035e"
  },
  {
    "url": "static/js/main.32f5a366.chunk.js",
    "revision": "6dda985a96991338940f80ed8eaa9f12"
  },
  {
    "url": "static/js/runtime~main.a8a9905a.js",
    "revision": "238c9148d722c1b6291779bd879837a1"
  }
]);

    /* custom cache rules*/
    workbox.routing.registerRoute(
      new RegExp('/.*/'),
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