module.exports = {
  images: {
    domains: [
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
};
