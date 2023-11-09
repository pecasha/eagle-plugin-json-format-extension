const withBundleAnalyzer =
    process.env.ANALYZE === "true"
        ? require("@next/bundle-analyzer")({
            enabled: process.env.ANALYZE === "true"
        })()
        : x => x;

/**
 * @type {import("next").NextConfig}
 */
const config = {
    assetPrefix: "./",
    reactStrictMode: false,
    productionBrowserSourceMaps: false,
    compiler: {
        styledComponents: true
    }
};

module.exports = withBundleAnalyzer(config);
