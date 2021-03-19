const HtmlWebPackPlugin = require('html-webpack-plugin');
const MinicssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
//const { CleanWebpackPlugin } = require('clean-webpack-plugin');



module.exports = {

    mode: 'production',
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin()]
    },

    output: {
        filename: 'main.[hash].js',
        clean: true,
    },

    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.css$/,
                exclude: /styles\.css$/i,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use: [
                    MinicssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    minimize: false,
                    sources: false,
                },
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        esModule: false
                    }
                }]
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MinicssExtractPlugin({
            filename: '[name].[hash].css',
            ignoreOrder: false
        }),

        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets/' },
            ],
        }),
        new MinifyPlugin(),
        //new CleanWebpackPlugin(),

    ]

}