module.exports = {
  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
    stripe_secret_key: process.env.STRIPE_SECRET_KEY,
    stripe_signing_secret: process.env.STRIPE_SIGNING_SECRET,
  },
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
