/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://mern-app-frontend-one.vercel.app/:path*',
            },
        ];
    },
};

export default nextConfig;