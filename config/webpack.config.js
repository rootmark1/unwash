const path = require('path');
const fs = require('fs');
const YAML = require('yaml');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const FILENAMES = {
    srcJS: './src/js/index.js', // Relative to Root
    srcSCSS: './src/styles/main.scss', // Relative to Root
    buildJS: './assets/custom_bundle.js', // Relative to the shopify folder
    buildCSS: './assets/custom_bundle.css', // Relative to the shopify folder
    assets: './assets/'
}

module.exports = (_, args) => {
    const configFile = args.env === 'true' ? fs.readFileSync('./custom_config.yml', 'utf8')  : fs.readFileSync('./config.yml', 'utf8');
    const configFileObject = YAML.parse(configFile);
    return {
        stats: 'errors-only',
        entry: [FILENAMES.srcJS, FILENAMES.srcSCSS],
        output: {
            path: path.resolve(__dirname, '../shopify'),
            filename: FILENAMES.buildJS
        },
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env'],
                                cacheDirectory: true
                            }
                        
                        }
                    ]
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        'cache-loader',
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                url: false
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                config: {
                                    path: 'postcss.config.js'
                                }
                            }
                        },
                        'sass-loader',
                    ],
                }
            ]
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery'
            }),
            new MiniCssExtractPlugin({
                filename: FILENAMES.buildCSS,
            }),
            new BrowserSyncPlugin({
                proxy: `https://${configFileObject.development.store}/?preview_theme_id=${configFileObject.development.theme_id}&_fd=0&pb=0`,
                files: [ path.resolve(__dirname, '../theme.update')],
                reloadDelay: 1000,
                snippetOptions: {
                    rule: {
                        match: /<\/body>/i,
                        fn: (snippet, match) => {
                            return `${snippet}${match}`;
                        }
                    }
                }
            }, {
                reload: false
            })
        ],
    }
};
    