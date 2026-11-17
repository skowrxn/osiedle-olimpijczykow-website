/** @type {import('next').NextConfig} */
const nextConfig = {
    // sharp jest biblioteka natywna - Next ma ja traktowac jako zewnetrzna
    // i dolaczyc binarke do funkcji serwerowej, a nie pakowac przez bundler.
    serverExternalPackages: ["sharp"],
    images: {
        unoptimized: false,
        formats: ["image/avif", "image/webp"],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 31536000,
        remotePatterns: [
            { protocol: "https", hostname: "**.r2.dev" },
            { protocol: "https", hostname: "res.cloudinary.com" },
            { protocol: "https", hostname: "img.icons8.com" },
        ],
    },
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
};
export default nextConfig;
