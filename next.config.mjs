/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: false, // Włącz optymalizację obrazów (cache + kompresja)
        formats: ["image/avif", "image/webp"], // Preferowane formaty (lżejsze)
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 31536000, // Cache na 1 rok (365 dni)
        remotePatterns: [
            // Strapi production
            {
                protocol: "https",
                hostname: "admin-panel-olimpijczykow-dlpb9.ondigitalocean.app",
            },
            // Strapi localhost (dla developmentu)
            {
                protocol: "http",
                hostname: "localhost",
                port: "1337",
            },
        ],
    },
    // Dodatkowe headers dla cache
    async headers() {
        return [
            {
                source: "/:all*(svg|jpg|jpeg|png|gif|webp|avif|ico)",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
        ];
    },
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination:
                    "https://admin-panel-olimpijczykow-dlpb9.ondigitalocean.app/api/:path*",
            },
            {
                source: "/uploads/:path*",
                destination:
                    "https://admin-panel-olimpijczykow-dlpb9.ondigitalocean.app/uploads/:path*",
            },
        ];
    },
};
export default nextConfig;
