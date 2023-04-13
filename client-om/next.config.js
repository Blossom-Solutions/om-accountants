// next.config.js

const withPlugins = require('next-compose-plugins');
const withFonts = require('next-fonts');

// Polyfill for AbortController
if (typeof globalThis.AbortController === 'undefined') {
  const { AbortController, AbortSignal } = require('abort-controller');
  globalThis.AbortController = AbortController;
  globalThis.AbortSignal = AbortSignal;
}

const nextConfig = {
  reactStrictMode: true,
};

module.exports = withPlugins([withFonts], nextConfig);
