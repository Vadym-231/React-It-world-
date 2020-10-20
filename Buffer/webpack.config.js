const path = require('path')
const autoprefixer = require('autoprefixer')
module.exports = {
    devServer: {
        //historyApiFallback: true,
        contentBase: './',
        hot: true,
        historyApiFallback: true

    },
    entry: "./src/index.js",
    output: {
        path: path.resolve("dist"),
        filename: "bundle.js"
    },


    module: {

        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: ['babel-loader'],

            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true
                        }
                    }
                ],
                include: /\.module\.css$/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
                exclude: /\.module\.css$/
            }
            /*{
                test: /\.css$/,
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: "[name]__[local]___[hash:base64:5]"
                            }

                        },
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                    ],
                                    flexbox: 'no-2009',
                                }),
                                require('postcss-modules-values'),
                            ],
                        },
                    },
                ],
            }
        */]
    }
}
/*
test: /\.css$/,
    use: [
    'style-loader',
    'css-loader',
    {
        loader: 'postcss-loader',
        options:
            {
                plugins: () => [require('autoprefixer')]
            }
    }]*/