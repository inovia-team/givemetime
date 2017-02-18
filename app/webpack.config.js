const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')

const PATHS = {
    src: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build'),
}

process.env.BABEL_ENV = 'development'

const common = {
    entry: PATHS.src + '/index.jsx',
    output: {
        path: PATHS.build,
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css?url=false'],
                //include: PATHS.src,
            },
            {
                test: /\.json$/,
                loader: 'json',
            },
            {
                test: /\.jsx?$/,
                loader: 'babel?cacheDirectory',
                include: PATHS.src,
            },
            {
                test: /\.(png|jpg|jpeg|gif)(\?[\s\S]+)?$/,
                loader: 'url-loader',
            },
        ],
        noParse: /react\/lib\/ExecutionEnvironment/,
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.STAGING || 'development'),
                'GOOGLE_CLIENT_ID': JSON.stringify(process.env.GOOGLE_CLIENT_ID || 'Please set the GOOGLE_CLIENT_ID env var'),
                'GOOGLE_CLIENT_SECRET': JSON.stringify(process.env.GOOGLE_CLIENT_SECRET || 'Please set the GOOGLE_CLIENT_SECRET env var'),
                'GOOGLE_REDIRECT_URL': JSON.stringify(process.env.GOOGLE_REDIRECT_URL || 'Please set the GOOGLE_REDIRECT_URL env var'),
                'API_URL': JSON.stringify(process.env.API_URL || null),
                'PORT': JSON.stringify(process.env.PORT || null),
                'GOOGLE_AUTH_MOCK': JSON.stringify(process.env.GOOGLE_AUTH_MOCK || null),
            },
        }),
    ],
}

// enhance conf with development setup
let conf = common
if (process.env.STAGING !== 'production') {
    conf = merge(common, {
        devtool: '#inline-source-map',
        devServer: {
            contentBase: PATHS.build,

            // Enable history API fallback so HTML5 History API based
            // routing works. This is a good default that will come
            // in handy in more complicated setups.
            historyApiFallback: {
                index: '/',
                rewrites: [
                    { from: /.*\/bundle\.js.*/, to: '/bundle.js' },
                    { from: /.*/, to: '/' },
                ],
            },
            inline: true,
            progress: true,

            publicPath: '/',

            // Display only errors to reduce the amount of output.
            stats: 'errors-only',

            // Parse host and port from env so this is easy to customize.
            host: process.env.HOST || '0.0.0.0',
            port: process.env.API_PORT || 4000,

            proxy: {
                '/jwt_auth': {
                    target: 'http://localhost:3000',
                },
            },
        },
    })
}


module.exports = conf
