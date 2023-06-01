/* eslint-disable import/no-commonjs */

module.exports = (api) => {
    api.cache(false);

    const plugins = [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-export-namespace-from',
        '@babel/plugin-transform-modules-commonjs',
    ];

    const config = {
        presets: [
            '@babel/preset-env',
            '@babel/preset-typescript',
            '@babel/preset-react',
        ],
        plugins,
    };

    return config;
};
