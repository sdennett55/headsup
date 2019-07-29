if ('function' === typeof importScripts) {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
  );

  /* global workbox */
  if (workbox) {

    self.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'SKIP_WAITING') {
        console.log('poop from serviceworker');
        self.skipWaiting();
      }
    });

    self.addEventListener('activate', event => {
      event.waitUntil(self.clients.claim());
    });
    

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([]);

    /* custom cache rules*/
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