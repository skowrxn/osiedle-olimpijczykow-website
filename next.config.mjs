/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true, // Wyłącza optymalizację obrazów
        formats: ["image/avif", "image/webp"], // preferowane formaty
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60,
        remotePatterns: [
            // Strapi production
            {
                protocol: "https",
                hostname: "light-sparkle-4fc84d1e23.strapiapp.com",
            },
            // Strapi localhost (dla developmentu)
            {
                protocol: "http",
                hostname: "localhost",
                port: "1337",
            },
        ],
    },
};
export default nextConfig;
