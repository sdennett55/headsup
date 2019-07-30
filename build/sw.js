if ('function' === typeof importScripts) {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
  );

  /* global workbox */
  if (workbox) {

    self.addEventListener('install', event => {
      self.skipWaiting();
    });

    self.addEventListener('activate', event => {
      event.waitUntil(self.clients.claim());
    });
    

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([
  {
    "url": "asset-manifest.json",
    "revision": "03731540a63d1e44d57f3ceb2bb59cb9"
  },
  {
    "url": "favicon.png",
    "revision": "47e35bc4f7cae02b5c598a1460ad887b"
  },
  {
    "url": "fonts/staatliches-regular-webfont.woff",
    "revision": "c0bfd12c269c4c7e8840a89dd56f785d"
  },
  {
    "url": "fonts/staatliches-regular-webfont.woff2",
    "revision": "64768d1b7f4626c0eabec9b84f86178a"
  },
  {
    "url": "fonts/Staatliches-Regular.ttf",
    "revision": "d5746e3b20453d6cee99ab27a0bdf949"
  },
  {
    "url": "images/apple-touch-icon.png",
    "revision": "6c07c1df9e1da241d464b8a073b28df1"
  },
  {
    "url": "images/icons-192.png",
    "revision": "0c7e1204fc81938780b87d85fe162cdb"
  },
  {
    "url": "images/icons-512.png",
    "revision": "d6c6fd0ccd4355301f4a0c4cbdbdaf16"
  },
  {
    "url": "index.html",
    "revision": "636793530fe64c5ea5243f1aaa01fc34"
  },
  {
    "url": "manifest.json",
    "revision": "4942aa4c9d8b5297ec5cc39baa980ddc"
  },
  {
    "url": "precache-manifest.12bd8dc5db5208f61a246b9345c1e14b.js",
    "revision": "12bd8dc5db5208f61a246b9345c1e14b"
  },
  {
    "url": "service-worker.js",
    "revision": "0893867a70c3e771a9f8296a0223b877"
  },
  {
    "url": "static/css/main.f13cd5c4.chunk.css",
    "revision": "227b585db006220de4fddd1a77d78bf9"
  },
  {
    "url": "static/js/2.a136ec79.chunk.js",
    "revision": "f0e161bba7efc4c94cfaafdd7eb0161c"
  },
  {
    "url": "static/js/main.c40a589e.chunk.js",
    "revision": "4d33d77028623c957ad6ea380aa5a31c"
  },
  {
    "url": "static/js/runtime~main.a8a9905a.js",
    "revision": "238c9148d722c1b6291779bd879837a1"
  },
  {
    "url": "static/media/aliens.6a9ad793.jpg",
    "revision": "6a9ad7937d7e0d0732fae3520ee6bf4f"
  },
  {
    "url": "static/media/anna.d1bf64aa.jpg",
    "revision": "d1bf64aa9c298e141d12d10cf171dc74"
  },
  {
    "url": "static/media/ariel.b5dce626.jpg",
    "revision": "b5dce626c1c280c27907e9f8e8d63bb6"
  },
  {
    "url": "static/media/aurora.e9dc6501.jpg",
    "revision": "e9dc65013c3768fe5e5628de1ca4717d"
  },
  {
    "url": "static/media/beauty.bce484e6.jpg",
    "revision": "bce484e6a5860b91f6106c699f4ba282"
  },
  {
    "url": "static/media/buzz_lightyear.a97df1ab.jpg",
    "revision": "a97df1ab9608431b4c2c0da87aadcffe"
  },
  {
    "url": "static/media/captain_jack_sparrow.37d3a2c5.jpg",
    "revision": "37d3a2c59f2404f4cfe1770146010588"
  },
  {
    "url": "static/media/daisy_duck.0aba4c7c.jpg",
    "revision": "0aba4c7c5c52c32b98f135ba4bfcbb34"
  },
  {
    "url": "static/media/doc_hudson.16bc16fd.jpg",
    "revision": "16bc16fde87bd0b949225f4e131d65ce"
  },
  {
    "url": "static/media/donald_duck.c482c963.jpg",
    "revision": "c482c963a9c78aebc879706b7fe6d483"
  },
  {
    "url": "static/media/duke_of_weselton.4f3cae2b.jpg",
    "revision": "4f3cae2b6ee9f4d987b2df078746c12f"
  },
  {
    "url": "static/media/elena.05ac985b.jpg",
    "revision": "05ac985ba9db7290fd2ccb47422f223e"
  },
  {
    "url": "static/media/elsa.5aa6bb3a.jpg",
    "revision": "5aa6bb3a6b8c36fc7583dfe38ea33816"
  },
  {
    "url": "static/media/fawn.486c365c.jpg",
    "revision": "486c365cef857115399e91650de06c17"
  },
  {
    "url": "static/media/fillmore.5b5f21c8.jpg",
    "revision": "5b5f21c8c24300f9e221fa6f089c6279"
  },
  {
    "url": "static/media/flo.d86ebf93.jpg",
    "revision": "d86ebf93f82cf4e469ca3338c0c19209"
  },
  {
    "url": "static/media/gear.3f977a74.svg",
    "revision": "3f977a74e22d054181b0e69efe84e5af"
  },
  {
    "url": "static/media/goofy.82e33f9d.jpg",
    "revision": "82e33f9dc15551f3087e321fdca48cb5"
  },
  {
    "url": "static/media/hans.0278c5ea.jpg",
    "revision": "0278c5ea1fca3ccf5ac13adff5acda43"
  },
  {
    "url": "static/media/iridessa.181ecc41.jpg",
    "revision": "181ecc413623cf15757d77035237bb4d"
  },
  {
    "url": "static/media/jasmine.6fc90898.jpg",
    "revision": "6fc90898784ae2e46f208a2df992b9b6"
  },
  {
    "url": "static/media/jessie.3b62c2ac.jpg",
    "revision": "3b62c2ace9202799c25d6404e7ad96f8"
  },
  {
    "url": "static/media/kanga_&_roo.54b5125f.jpg",
    "revision": "54b5125fd1159d332f0ee1ddb5cc2df9"
  },
  {
    "url": "static/media/kristoff.2c60b4e8.jpg",
    "revision": "2c60b4e856ff232d6182fc50451d0dbb"
  },
  {
    "url": "static/media/lightning_mcqueen.40ca5cbd.jpg",
    "revision": "40ca5cbd5d4b640c23debeff675be959"
  },
  {
    "url": "static/media/luigi.a462eca3.jpg",
    "revision": "a462eca3823b3bbb9bf615dc7e4e0237"
  },
  {
    "url": "static/media/marshmallow.3e3eeafe.jpg",
    "revision": "3e3eeafef9f9ebf45defbf64bc84c863"
  },
  {
    "url": "static/media/mater.93a5afd1.jpg",
    "revision": "93a5afd16abcfdb8bb889ef9bee9ccce"
  },
  {
    "url": "static/media/merida.210fbfd8.jpg",
    "revision": "210fbfd87a4b5094dbf9de4d3bbfc2f8"
  },
  {
    "url": "static/media/mickey_mouse.3f10d0b2.jpg",
    "revision": "3f10d0b2f4e63cfda4a5743a39c9b4a7"
  },
  {
    "url": "static/media/minnie_mouse.76950db2.jpg",
    "revision": "76950db2b31775158eb9b6ec5e619ba5"
  },
  {
    "url": "static/media/mr._potato_head.0ac076a3.jpg",
    "revision": "0ac076a3f64e43541c56fae5c727b36e"
  },
  {
    "url": "static/media/mufasa.62732583.jpg",
    "revision": "6273258310dad92b4b17c3c06c0c1bcc"
  },
  {
    "url": "static/media/nala.7273636f.jpg",
    "revision": "7273636f3056eaef9f2501405f14e740"
  },
  {
    "url": "static/media/oaken.d9f95737.jpg",
    "revision": "d9f9573753f0520ddfedab7c6a5379fc"
  },
  {
    "url": "static/media/olaf.d14fc31b.jpg",
    "revision": "d14fc31be55180338988b64104fff9b5"
  },
  {
    "url": "static/media/pluto.cf3ae428.jpg",
    "revision": "cf3ae42843fd153dedab292ff228fb58"
  },
  {
    "url": "static/media/pumba.ec499670.jpg",
    "revision": "ec499670d2ba3a52175842996ff1a174"
  },
  {
    "url": "static/media/rabbit.24619ec6.jpg",
    "revision": "24619ec6d3059739e1e2e868c3a1712f"
  },
  {
    "url": "static/media/rafiki.0d755118.jpg",
    "revision": "0d7551185a842a67cdd03818d8cf535b"
  },
  {
    "url": "static/media/ramone.e585e01b.jpg",
    "revision": "e585e01bed6fed2cae126c2e86ab1d8f"
  },
  {
    "url": "static/media/rapunzel.8380a199.jpg",
    "revision": "8380a19936340c80a6089f5f5862815c"
  },
  {
    "url": "static/media/rex.547ece9f.jpg",
    "revision": "547ece9f8e43a083d38a4a50d3784f1c"
  },
  {
    "url": "static/media/rosetta.0f56dbf3.jpg",
    "revision": "0f56dbf3418a04316a5f785adddef1aa"
  },
  {
    "url": "static/media/sarge.63dabf25.jpg",
    "revision": "63dabf25c20a7081d9d0a960723908c8"
  },
  {
    "url": "static/media/scar.c9bc014f.jpg",
    "revision": "c9bc014f38d81aa2b149259a5006a417"
  },
  {
    "url": "static/media/silvermist.1171b130.jpg",
    "revision": "1171b130a061fde04f382493d0338dbe"
  },
  {
    "url": "static/media/simba.45d90068.jpg",
    "revision": "45d900686b12179c5a0ee3a9195b38fe"
  },
  {
    "url": "static/media/slinky_dog.85dbb99c.jpg",
    "revision": "85dbb99ce9a2cb2e74a4b446086d2b44"
  },
  {
    "url": "static/media/snow_white.c48cc062.jpg",
    "revision": "c48cc062b7573f3380e5e73833006015"
  },
  {
    "url": "static/media/snowgies.391422c4.jpg",
    "revision": "391422c4e1064122f30ed7738f6751fa"
  },
  {
    "url": "static/media/stars.82d3d893.svg",
    "revision": "82d3d89309f46fab5b39ab566c92ba21"
  },
  {
    "url": "static/media/sven.80adb5d4.jpg",
    "revision": "80adb5d468d93615bd455a87a3b07de5"
  },
  {
    "url": "static/media/tiana.3ee3270d.jpg",
    "revision": "3ee3270de2684ac4c92c00fcd15d046c"
  },
  {
    "url": "static/media/tigger.d37a55c6.jpg",
    "revision": "d37a55c67b405ea3b785d3039a2de9f5"
  },
  {
    "url": "static/media/timon.564c32d4.jpg",
    "revision": "564c32d45274f214fcfcd94c7c002e44"
  },
  {
    "url": "static/media/vidia.e15e779b.jpg",
    "revision": "e15e779bd88b0e77d9d05902d3c12f83"
  },
  {
    "url": "static/media/woody.a8480b72.jpg",
    "revision": "a8480b728b89a23cd34add3d2aaaaa60"
  },
  {
    "url": "static/media/zasu.b2521ae1.jpg",
    "revision": "b2521ae17d87ce439cf4c40b7281d9f3"
  }
]);

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