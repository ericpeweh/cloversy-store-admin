/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ["storage.googleapis.com"],
		minimumCacheTTL: 1500000
	},
	experimental: {
		scrollRestoration: true
	}
};

module.exports = nextConfig;
