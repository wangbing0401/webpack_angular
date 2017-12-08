/**
 * Created by WB on 2017/10/25.
 */
var webpack = require("webpack");
var path = require("path");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
module.exports = {
    //入口文件
    entry: './app/app.js',
    //输出文件
    output: {
        path: path.resolve(__dirname, './build'),
        publicPath: '/build/',
        filename: 'main.js',
        chunkFilename: 'chunk[id].js?[chunkhash]',
    },

    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test:/\.(eot|ttf|woff|woff2|svg)$/,
                loader:'file?name=css/fonts/[name].[ext]'
            },
            {
                test: /\.html$/,
                use: [ 'file-loader?name=[path][name].[ext]!extract-loader!html-loader' ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },

    //自动启动浏览器
    plugins: [
        new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}