import { resolve } from 'path';
import { VueLoaderPlugin } from 'vue-loader';

export const entry = './src/main.js';
export const output = {
    path: resolve(import.meta.url, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
};
export const module = {
    rules: [
        {
            test: /\.vue$/,
            loader: ['vue-loader']
        },
        {
            test: /\.js$/,
            use: ['babel-loader']
        }
    ]
};
export const plugins = [
    new VueLoaderPlugin()
];
