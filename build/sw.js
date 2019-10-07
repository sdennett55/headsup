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
    "revision": "878fed11fab26507072f93d42ec72164"
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
    "revision": "756bcf3ea971fcf43e4800b225fb4c01"
  },
  {
    "url": "manifest.json",
    "revision": "4942aa4c9d8b5297ec5cc39baa980ddc"
  },
  {
    "url": "precache-manifest.4a43e2e722d9e8cd34582ef9a1cf05bf.js",
    "revision": "4a43e2e722d9e8cd34582ef9a1cf05bf"
  },
  {
    "url": "service-worker.js",
    "revision": "4ef456249185a557098457026766c37e"
  },
  {
    "url": "static/css/main.88645aa4.chunk.css",
    "revision": "d7eaf39b737618dbb0503d8efed3ea96"
  },
  {
    "url": "static/js/2.8feccd54.chunk.js",
    "revision": "1146f626f076a26369e5521c9c8105ae"
  },
  {
    "url": "static/js/main.0a385f4b.chunk.js",
    "revision": "837ee98587addd7dca55d44148765136"
  },
  {
    "url": "static/js/runtime~main.a8a9905a.js",
    "revision": "238c9148d722c1b6291779bd879837a1"
  },
  {
    "url": "static/media/aladdin.88f42cbb.jpg",
    "revision": "88f42cbb4d2a11e3d49c437bb45cdd4a"
  },
  {
    "url": "static/media/alice.6f4f5919.png",
    "revision": "6f4f5919bd34c22adb026b36f28f2845"
  },
  {
    "url": "static/media/aliens.69285c00.jpg",
    "revision": "69285c00c64feb6e90bfc119e8fdadf2"
  },
  {
    "url": "static/media/anna.7de015e6.jpg",
    "revision": "7de015e65d8b082f16156eaad8a0bad6"
  },
  {
    "url": "static/media/ariel.b0297f79.png",
    "revision": "b0297f79adac2ed02bc7d973fa7e6078"
  },
  {
    "url": "static/media/aurora.9f571935.png",
    "revision": "9f5719352f020e7f21a4d35546c56ffa"
  },
  {
    "url": "static/media/bambi.c91fe250.png",
    "revision": "c91fe250ab65258bb95bb12205a9b2ab"
  },
  {
    "url": "static/media/belle.e1689a95.jpg",
    "revision": "e1689a955c95e00cdf049ce1acc300d9"
  },
  {
    "url": "static/media/bo_peep.bd79a738.png",
    "revision": "bd79a7387138686caf6c51b6b1d7f5ab"
  },
  {
    "url": "static/media/boo.d67430aa.png",
    "revision": "d67430aadbab9b6006eb56dd0e133ff3"
  },
  {
    "url": "static/media/bruce.161612ae.jpg",
    "revision": "161612ae8a0b652fa8d1cedf8c520892"
  },
  {
    "url": "static/media/buzz_lightyear.8eb4429c.jpg",
    "revision": "8eb4429c0f2bf5be120607ba66f26193"
  },
  {
    "url": "static/media/captain_jack_sparrow.cffcd24e.jpg",
    "revision": "cffcd24eff13751f466be2d31947ffdb"
  },
  {
    "url": "static/media/carpet.aa50e769.jpg",
    "revision": "aa50e769f30009d9f6f9c019eccdaca3"
  },
  {
    "url": "static/media/christopher_robin.17492c8e.jpg",
    "revision": "17492c8ed88ebb202e4dd151489ae470"
  },
  {
    "url": "static/media/cinderella.e2173068.jpg",
    "revision": "e21730688d58cc5782b796c4e5c1ef42"
  },
  {
    "url": "static/media/crush.a4d8e327.jpg",
    "revision": "a4d8e3272081b5bc5934c64c588c865d"
  },
  {
    "url": "static/media/daisy_duck.686b302e.jpg",
    "revision": "686b302ef3501b14d3f58df31e53ef39"
  },
  {
    "url": "static/media/donald_duck.d8a3854f.jpg",
    "revision": "d8a3854f4e8181ebc19d733a6330544f"
  },
  {
    "url": "static/media/dory.fd371532.jpg",
    "revision": "fd37153247eb790d5fcaca71e1a847cf"
  },
  {
    "url": "static/media/duke_of_weselton.de5c8aba.jpg",
    "revision": "de5c8abacea2fc9e30d0ba50552db6c8"
  },
  {
    "url": "static/media/elena.472d30e4.jpg",
    "revision": "472d30e4324a14efe2d12fb8662ebd67"
  },
  {
    "url": "static/media/elsa.aa0992d0.jpg",
    "revision": "aa0992d066237c15a52ec9b5192d73ac"
  },
  {
    "url": "static/media/fawn.9f550422.jpg",
    "revision": "9f550422f544413eaef95c8b4694a1bd"
  },
  {
    "url": "static/media/flounder.221bbe8a.jpg",
    "revision": "221bbe8a8b017d8580a4bb305037b41b"
  },
  {
    "url": "static/media/gear.3f977a74.svg",
    "revision": "3f977a74e22d054181b0e69efe84e5af"
  },
  {
    "url": "static/media/genie.446f5df8.jpg",
    "revision": "446f5df89c04cd6c5c3d52cba90e6b8c"
  },
  {
    "url": "static/media/goofy.7f7afa25.jpg",
    "revision": "7f7afa25042079ea2e7aea88ae2cbb7a"
  },
  {
    "url": "static/media/hans.acd04f3a.jpg",
    "revision": "acd04f3a498f03948eae6aa88e8ccb6d"
  },
  {
    "url": "static/media/heihei.ac840290.png",
    "revision": "ac84029054bff251b36f49aafdeead3a"
  },
  {
    "url": "static/media/iago.1da9b7d9.jpg",
    "revision": "1da9b7d96e1d11b6d4c0190e677ad4a3"
  },
  {
    "url": "static/media/iridessa.9d90a9cc.jpg",
    "revision": "9d90a9ccc06084810da5e80eb9699205"
  },
  {
    "url": "static/media/jafar.197067a5.jpg",
    "revision": "197067a5297605fb5f299a601049952b"
  },
  {
    "url": "static/media/jasmine.4269913e.jpg",
    "revision": "4269913e14856d2100f9abec52e127d6"
  },
  {
    "url": "static/media/jessie.d30532db.jpg",
    "revision": "d30532db5051805411716e1bd6c96d56"
  },
  {
    "url": "static/media/kanga_&_roo.dd869e74.jpg",
    "revision": "dd869e74174f380581b34df7a1c3d111"
  },
  {
    "url": "static/media/king_triton.b5236f2d.jpg",
    "revision": "b5236f2d4f18805ef28a51ba00f5f71f"
  },
  {
    "url": "static/media/kristoff.96d2dea6.jpg",
    "revision": "96d2dea63f0e5d8ed6df9999801a62a3"
  },
  {
    "url": "static/media/lightning_mcqueen.635eceab.jpg",
    "revision": "635eceab1bd49b352ea23f0427006b38"
  },
  {
    "url": "static/media/lilo.e9a13cf3.png",
    "revision": "e9a13cf32b98e8468d32e22535201a12"
  },
  {
    "url": "static/media/maleficent.851e13a6.png",
    "revision": "851e13a6941b01ec821ba29a224f70b7"
  },
  {
    "url": "static/media/marshmallow.4373fe08.jpg",
    "revision": "4373fe08844acc8923d7db1261d93127"
  },
  {
    "url": "static/media/maui.2a2c3202.png",
    "revision": "2a2c3202f9e7e90ed46d93357e3e3aad"
  },
  {
    "url": "static/media/merida.c5067c5d.jpg",
    "revision": "c5067c5d82ea5da4c84297cc07efea5d"
  },
  {
    "url": "static/media/mickey_mouse.4fc58a8b.jpg",
    "revision": "4fc58a8b68250772c876fc7b56feef82"
  },
  {
    "url": "static/media/minnie_mouse.e057d336.jpg",
    "revision": "e057d336dcd6a872b20debd774810bd5"
  },
  {
    "url": "static/media/moana.17fcc89b.png",
    "revision": "17fcc89b3cd4243a9013bfb712d54610"
  },
  {
    "url": "static/media/mr._potato_head.874a4cc2.jpg",
    "revision": "874a4cc2a93612f0ead279f3a613d874"
  },
  {
    "url": "static/media/mufasa.69df0131.jpg",
    "revision": "69df0131f5d0ddfe1e9c2c59d34d3987"
  },
  {
    "url": "static/media/mulan.fd01b49f.png",
    "revision": "fd01b49fa6d6febd2244941c2e5ddea7"
  },
  {
    "url": "static/media/nala.4bf4728e.png",
    "revision": "4bf4728e6bbae782fea53a7a190b7ccf"
  },
  {
    "url": "static/media/oaken.13faf1cf.jpg",
    "revision": "13faf1cfa438a9663d9f66c7fa1e8a52"
  },
  {
    "url": "static/media/olaf.4ce50bb1.jpg",
    "revision": "4ce50bb18fce882fba754af5ce68952e"
  },
  {
    "url": "static/media/owl.515c1fc0.jpg",
    "revision": "515c1fc05cbe492ac97a7b148e0944c4"
  },
  {
    "url": "static/media/peach.32c032c8.jpg",
    "revision": "32c032c86f15e1c123936094e617607f"
  },
  {
    "url": "static/media/pluto.1da58ba0.jpg",
    "revision": "1da58ba00aa2f541baa8e20a4e57bee9"
  },
  {
    "url": "static/media/pocahontas.5c549976.png",
    "revision": "5c5499765cd6f19e3c5889f9f65f8ca0"
  },
  {
    "url": "static/media/prince_eric.9e2c74e9.jpg",
    "revision": "9e2c74e9216875f1d69801e9e42b4f31"
  },
  {
    "url": "static/media/pumba.62e2f832.jpg",
    "revision": "62e2f83272f2cde09aa3bccf81b3f7f9"
  },
  {
    "url": "static/media/rabbit.3e59734a.jpg",
    "revision": "3e59734a3f2659aa54d182ba842ecb72"
  },
  {
    "url": "static/media/rafiki.e6e3bab6.jpg",
    "revision": "e6e3bab6f1e076d514587202a2ecda8b"
  },
  {
    "url": "static/media/rajah.2da4e760.jpg",
    "revision": "2da4e760150a8c8c97fc70d870770810"
  },
  {
    "url": "static/media/rapunzel.09251ead.png",
    "revision": "09251eadc14e092df06bd15d87a090f6"
  },
  {
    "url": "static/media/rex.999c68a0.jpg",
    "revision": "999c68a01b95812780f9b249b4af7d6b"
  },
  {
    "url": "static/media/rosetta.dfe4d275.jpg",
    "revision": "dfe4d27565aa9456b42034b59e4c8734"
  },
  {
    "url": "static/media/scar.3c6051aa.jpg",
    "revision": "3c6051aa7369a083cd915c078a8981ad"
  },
  {
    "url": "static/media/scuttle.d3647ca6.jpg",
    "revision": "d3647ca6d0baae8ce77c6f6b2dbcb005"
  },
  {
    "url": "static/media/silvermist.05c267e4.jpg",
    "revision": "05c267e491f381a92b08fe06fb0a129f"
  },
  {
    "url": "static/media/simba.f63af41e.jpg",
    "revision": "f63af41e312b2e79bbbfea1d65a1b5bb"
  },
  {
    "url": "static/media/slinky_dog.d1ea1b6b.jpg",
    "revision": "d1ea1b6b2e2c3bf41690ffcb922797bb"
  },
  {
    "url": "static/media/snow_white.114f627c.png",
    "revision": "114f627cec750484547998fe381831e4"
  },
  {
    "url": "static/media/snowgies.178925fb.jpg",
    "revision": "178925fb40469da1822a6690b591fc31"
  },
  {
    "url": "static/media/squirt.4b3a8e87.jpg",
    "revision": "4b3a8e87b09ed7fa559c4ad68d0d03ac"
  },
  {
    "url": "static/media/stars.82d3d893.svg",
    "revision": "82d3d89309f46fab5b39ab566c92ba21"
  },
  {
    "url": "static/media/sultan.aa2ae5cd.jpg",
    "revision": "aa2ae5cded8bda2f86bab8198bd72860"
  },
  {
    "url": "static/media/sven.a778c1f6.jpg",
    "revision": "a778c1f6e0d6d8e18c3c3223b091097c"
  },
  {
    "url": "static/media/tiana.9d3ec750.png",
    "revision": "9d3ec7500cb51d8ec315411450b8052b"
  },
  {
    "url": "static/media/tigger.dd28af6b.jpg",
    "revision": "dd28af6b426bf63bf676e7b3a341ba76"
  },
  {
    "url": "static/media/timon.243dfc88.jpg",
    "revision": "243dfc886d78b92d2e4a71837c19f671"
  },
  {
    "url": "static/media/tinker_bell.f725d008.png",
    "revision": "f725d008d4d1a2e26802ec5d42f19b9a"
  },
  {
    "url": "static/media/ursula.ffcb3610.jpg",
    "revision": "ffcb36108ccbbde60036b1a049a1d598"
  },
  {
    "url": "static/media/vidia.d577f064.jpg",
    "revision": "d577f064302e4bcaeb0056f48095cced"
  },
  {
    "url": "static/media/woody.f2b85fe4.jpg",
    "revision": "f2b85fe424d3a212df14b98b8bf50e06"
  },
  {
    "url": "static/media/zasu.b5143896.jpg",
    "revision": "b5143896e64e7fdc0b1879d890a5fc7f"
  }
]);

    /* offline analytics */
    workbox.googleAnalytics.initialize(); 

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