/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: () => {
    let compilerConfig = {
      styledComponent: true,
    };

    if (process.env.NODE_ENV === "production") {
      compilerConfig = {
        ...compilerConfig,
        reactRemoveProperties: { properties: ["^data-testid"] },
      };
    }
    return compilerConfig;
  },
};

module.exports = nextConfig;
