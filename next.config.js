/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
    },
    // Suppress specific console logs in production if needed
};

module.exports = nextConfig;
