import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import WebpackPwaManifest from 'webpack-pwa-manifest';
import OfflinePlugin from 'offline-plugin';
import environment from '../environment';

const isDev = process.env.NODE_ENV !== 'production';
const publicPath = environment.PUBLIC_PATH || '/';

const modulesLoader = {
  test: /\.(js|jsx|mjs)$/,
  include: [
    path.join(__dirname, '../src'),
    path.join(__dirname, '../index.web.js'),
    path.join(__dirname, './'),
    path.join(__dirname, '../node_modules/easy-lottie-react-native'),
    path.join(__dirname, '../node_modules/react-navigation'),
    /node_modules\/svgs/,
    /node_modules\/react-native-/,
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: isDev,
      compact: !isDev,
      presets: ['react-native'],
      plugins: [
        [
          'module-resolver',
          {
            root: ['./'],
            alias: {
              DailyScrum: '../',
            },
          },
        ],
        [
          'transform-runtime',
          {
            helpers: false,
            polyfill: false,
          },
        ],
        'lodash',
      ],
    },
  },
};

// This is needed for webpack to import static images in JavaScript files
const imageLoaderConfiguration = {
  test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg/],
  loader: 'url-loader',
  options: {
    limit: 8000,
    outputPath: 'assets/',
    name: '[name].[ext]',
  },
};

const otherFilesLoaderConfiguration = {
  exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
  loader: 'file-loader',
  options: {
    outputPath: 'assets/',
  },
};

module.exports = {
  devServer: {
    open: true,
    port: 3000,
    historyApiFallback: true,
  },

  entry: [path.join(__dirname, '../index.web.js')],

  output: {
    path: path.join(__dirname, '../dist/web'),
    filename: 'bundle.js',
    publicPath,
  },

  module: {
    rules: [
      {
        oneOf: [imageLoaderConfiguration, modulesLoader, otherFilesLoaderConfiguration],
      },
    ],
  },

  plugins: [
    // `process.env.NODE_ENV === 'production'` must be `true` for production
    // builds to eliminate development checks and reduce build size.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.PUBLIC_PATH': JSON.stringify(publicPath),
      __DEV__: JSON.stringify(isDev),
    }),
    new CopyWebpackPlugin(
      [
        { from: 'src/assets/', to: 'assets/', force: true },
        environment.GITHUB && { from: 'src/404_redirection_GitHub.html', to: '404.html', force: true },
      ].filter(Boolean)
    ),
    new HtmlWebpackPlugin({
      title: environment.APP_NAME,
      filename: 'index.html',
      template: 'src/index.html',
      GA_ID: environment.GA_ID,
      GITHUB: environment.GITHUB,
    }),
    new WebpackPwaManifest({
      name: environment.APP_NAME,
      short_name: environment.APP_NAME,
      description: 'An app for your daily dose of Scrum',
      background_color: '#F5FCFF',
      theme_color: '#43d2fc',
      lang: 'en-US',
      orientation: 'portrait-primary',
      icons: [
        {
          src: path.resolve('../ios/DailyScrum/Images.xcassets/AppIcon.appiconset/icon-1024@1x.png'),
          sizes: [120, 152, 167, 180, 1024],
          destination: path.join('icons', 'ios'),
          ios: true,
        },
        {
          src: path.resolve('../ios/DailyScrum/Images.xcassets/AppIcon.appiconset/icon-1024@1x.png'),
          size: 1024,
          destination: path.join('icons', 'ios'),
          ios: 'startup',
        },
        {
          src: path.resolve('../ios/DailyScrum/Images.xcassets/AppIcon.appiconset/icon-1024@1x.png'),
          sizes: [36, 48, 72, 96, 128, 144, 192, 256, 512, 1024],
          destination: path.join('icons', 'android'),
        },
      ],
      related_applications: [
        {
          platform: 'play',
          url: 'https://play.google.com/store/apps/details?id=tech.bam.DailyScrum',
          id: 'tech.bam.DailyScrum',
        },
        {
          platform: 'itunes',
          url: 'https://itunes.apple.com/app/dailyscrum/id1286338464',
        },
      ],
      ios: true,
    }),
    !isDev &&
      new OfflinePlugin({
        ServiceWorker: {
          minify: false,
        },
        AppCache: false,
      }),
  ].filter(Boolean),

  resolve: {
    modules: [path.join(__dirname, '../node_modules'), path.join(__dirname, 'node_modules')],
    // Maps the 'react-native' import to 'react-native-web' and the stubs or mocks.
    alias: {
      'react-native': 'react-native-web',
      'react-navigation': 'react-navigation/src/react-navigation.js',
      FlatList: 'react-native-web-lists/src/FlatList',
      SectionList: 'react-native-web-lists/src/SectionList',
      'react-native-svg': 'svgs',
      'lottie-react-native': 'react-native-web-lottie',
      'react-native-linear-gradient': 'react-native-web-linear-gradient',
      Modal: path.join(__dirname, 'src/mocks/unimplemented'),
      'react-native-code-push': path.join(__dirname, 'src/mocks/react-native-code-push'),
      'react-native-safari-view': path.join(__dirname, 'src/mocks/unimplemented'),
      'react-native-splash-screen': path.join(__dirname, 'src/mocks/react-native-splash-screen'),
      'react-native-safe-area-view': path.join(__dirname, 'src/mocks/react-native-safe-area-view'),
      'react-native-firebase': path.join(__dirname, 'src/mocks/react-native-firebase'),
      '@yfuks/react-native-action-sheet': path.join(__dirname, 'src/mocks/react-native-action-sheet'),
    },
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
  },
  performance: {
    hints: isDev ? false : 'warning',
  },
};
