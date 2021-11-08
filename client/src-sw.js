const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// bringing in StaleWhileRevalidate for asset caching
const { StaleWhileRevalidate } = require('workbox-strategies');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching (** done **)
registerRoute(
  // ** define call back function that wil filter the requests we want to cache **
  ({ request }) => ['style', 'script', 'worker'].includes
  (request.destination),
  new StaleWhileRevalidate({
    // ** name of cache storage **
    cacheName: 'asset-cache',
    plugins: [
      // ** plugin to cache responses w/ these headers to a max age of 30 days **
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
