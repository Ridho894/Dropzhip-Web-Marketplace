module.exports = {
    images: {
        domains: [
            'links.papareact.com',
            'fakestoreapi.com',
            'img.freepik.com',
            'encrypted-tbn0.gstatic.com',
        ],
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        })

        return config
    },
}
