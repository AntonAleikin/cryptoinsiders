const path = require('path'); // Подлючаем втроенный в node модуль path для работы с путями
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const { config } = require('webpack');


const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;


const optimization = () => // Ф-ция для раздела оптимизации
{   
    const config = {
        splitChunks: { // Избегаем копирования кода. Отделяем вендоров (библиотеки) в отдельный файл
            chunks: 'all'
        }
    };

    if (isProd) // Для прода добавляем в объект настроек оптимизации поле minimizer и туда плагины для сжатия
    {
        config.minimizer = [
            new TerserWebpackPlugin(),
            
            new OptimizeCssAssetsWebpackPlugin(),

            new ImageMinimizerPlugin({
                minimizerOptions: {
                  plugins: [
                    ['gifsicle', { interlaced: true }],
                    ['mozjpeg', {quality: 60}],
                    ['pngquant', {speed: 10, strip: true}],
                    ['svgo', {plugins: [{removeViewBox: false,},],},],
                  ],
                },
            }),
        ];  
    }

    return config;
};



const cssLoaders = loader => // Избавляемся от копирования кода в css
{
    const loaders = 
    [
        {
            loader: MiniCssExtractPlugin.loader, // Добавляет стили в файл css
            options: {
                // Избегаем ошибки с publicPath и, при этом, записываем в css ссылки из url как в sass!
                publicPath: (resourcePath, context) => {
                    return path.relative(path.dirname(resourcePath), context) + '/';
                },
            }
        }, 
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: [
                        isProd ? require('autoprefixer') : undefined,
                        isProd ? require('postcss-sort-media-queries') : undefined
                    ], 
                },
            },
        },
        'resolve-url-loader',
    ];

    if (loader)
    {
        loaders.push(loader);
    }

    return loaders;
};


const  babelOptions = preset => // Добавляем пресеты и плагины в Babel options
{
    const options = {
        presets: [
            '@babel/preset-env',
        ],
        plugins: []
    };

    if (preset)
    {   
        options.presets.push(preset);
    }

    return options;
};


const copyAssets = (from, to = '') =>
{
    return {
        from: path.resolve(__dirname, `src/${from}`),
        to: path.resolve(__dirname, `dist/${to}`),
    };
};

const addHtmlPage = (templatePath, filenameStr) => 
{   
    return {
        filename: filenameStr,
        template: templatePath,
        minify: {
            collapseWhitespace: isProd
        },
    };
};


const plugins = () => // Тут все наши плагины и их анализ в проде
{
    const base = [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            },
        }),
        new HTMLWebpackPlugin(addHtmlPage('./about.html', 'about.html')),
        new HTMLWebpackPlugin(addHtmlPage('./blog.html', 'blog.html')),
        new HTMLWebpackPlugin(addHtmlPage('./blog-page.html', 'blog-page.html')),
        new HTMLWebpackPlugin(addHtmlPage('./blog/post.html', 'blog/post.html')),

        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),

        new CleanWebpackPlugin(),
    ];

    if (isProd)
    {
        base.push(
            new CopyWebpackPlugin({
                patterns: [
                    copyAssets('assets/favicons', 'media'), // Favicons
                    copyAssets('assets/og', 'media'), // OG
                ]
            }),
        );
        base.push(new BundleAnalyzerPlugin());
    }

    return base;
};


module.exports = // Экспортируем объект настроек для Вебпэка
{
    context: path.resolve(__dirname, 'src'), 

    mode: 'development',

    entry: {
        main: ['@babel/polyfill', './index.js'],
    },

    output: {
        filename: '[name].[contenthash].js', 
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
    },


    // Доп фичи
    resolve: { 
        extensions: ['.js', '.json', '.ts', '.png', '.svg'], // Можно вписать расширения, которые не хочется писать

        alias: { // Пути к папкам и файлам
            '@': path.resolve(__dirname, 'src'),
            '@js': path.resolve(__dirname, 'src/js'),
            '@img': path.resolve(__dirname, 'src/assets/img'),
            '@icons': path.resolve(__dirname, 'src/assets/img/icons'),
        }
    },


    // Оптимизация
    optimization: optimization(),


    // Source-map
    //devtool: isDev ? 'source-map' : 'cheap-module-eval-source-map',


    // Сервер для разработки
    devServer: {
        port: 3000,
        open: true
    },


    // Плагины 
    plugins: plugins(),



    // Loaders
    module: {
        rules: [
            // Объект, описывающий настройки лоадера
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: babelOptions()
                }
            },


            // TS
            {
                test: /\.m?ts$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: babelOptions('@babel/preset-typescript')
                }
            },


            // CSS
            {
                test: /\.css$/,
                use: cssLoaders(),
            },

            // SASS 
            {
                test: /\.s[ac]ss$/, 
                use: cssLoaders({
                    loader: 'sass-loader',
                    options: {
                      sourceMap: true,
                    }
                })
            },


            // Чтобы не грузить все файлы и пути для HTML вручную (img..) - используем html-loader
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attributes: {
                            list: [
                                {
                                    tag: 'img',
                                    attribute: 'src',
                                    type: 'src',
                                },
                                {
                                    tag: 'img',
                                    attribute: 'data-src',
                                    type: 'src',
                                },
                            ],
                        },                        
                    }
                },
            },


            // Картинки
            {
                test: /\.(png|jpe?g|svg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[contenthash].[ext]', // Сохраняем точную структуру папок на выходе
                },
            },


            // Шрифты
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                },
            },
        ]
    }
};