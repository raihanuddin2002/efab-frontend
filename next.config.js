/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development', // disables PWA in dev mode
});

const nextConfig = {}

module.exports = withPWA(nextConfig);
