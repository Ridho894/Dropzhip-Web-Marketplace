module.exports = {
  images: {
    domains: [
      process.env.NEXT_PUBLIC_API_DOMAIN_NAME,
      "img.freepik.com",
      "upload.wikimedia.org",
      "pbs.twimg.com",
      "res.cloudinary.com",
      "picsum.photos",
      "bit.ly",
      "localhost",
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};
