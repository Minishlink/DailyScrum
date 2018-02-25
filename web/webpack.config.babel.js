import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import WebpackPwaManifest from 'webpack-pwa-manifest';
import environment from '../environment';

const isDev = process.env.NODE_ENV !== 'production';

const modulesLoader = {
  test: /\.js$/,
  include: [
    path.join(__dirname, '../src'),
    path.join(__dirname, '../index.web.js'),
    path.join(__dirname, './'),
    path.join(__dirname, '../node_modules/easy-lottie-react-native'),
    path.join(__dirname, '../node_modules/react-navigation'),
    path.join(__dirname, '../node_modules/svgs'),
    /node_modules\/react-native-/,
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: !isDev,
      presets: ['react-native'],
      plugins: [
        [
          'module-resolver',
          {
            root: ['./'],
            alias: {
              DailyScrum: './',
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
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'file-loader',
    options: {
      outputPath: 'assets/',
      name: '[name].[ext]',
    },
  },
};

const fontLoaderConfiguration = {
  test: /\.ttf$/,
  loader: 'file-loader',
  options: {
    outputPath: 'assets/',
  },
  include: [/node_modules\/react-native-vector-icons/, path.join(__dirname, '../assets/native/fonts')],
};

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'src'),
  },

  entry: [path.join(__dirname, '../index.web.js')],

  output: {
    path: path.join(__dirname, '../dist/web'),
    filename: 'bundle.js',
  },

  module: {
    rules: [modulesLoader, imageLoaderConfiguration, fontLoaderConfiguration],
  },

  plugins: [
    // `process.env.NODE_ENV === 'production'` must be `true` for production
    // builds to eliminate development checks and reduce build size.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      __DEV__: JSON.stringify(isDev),
    }),
    new CopyWebpackPlugin([{ from: 'web/src/assets/', to: 'assets/', force: true }]),
    new HtmlWebpackPlugin({
      title: environment.APP_NAME,
      filename: 'index.html',
      template: 'web/src/index.html',
      GA_ID: environment.GA_ID,
    }),
    new WebpackPwaManifest({
      name: environment.APP_NAME,
      short_name: 'DailyScrum',
      description: 'An app for your daily dose of Scrum',
      background_color: '#F5FCFF',
      theme_color: '#43d2fc',
      lang: 'en-US',
      orientation: 'portrait-primary',
      icons: [
        {
          src: path.resolve('./ios/DailyScrum/Images.xcassets/AppIcon.appiconset/icon-1024@1x.png'),
          sizes: [120, 152, 167, 180, 1024],
          destination: path.join('icons', 'ios'),
          ios: true,
        },
        {
          src: path.resolve('./ios/DailyScrum/Images.xcassets/AppIcon.appiconset/icon-1024@1x.png'),
          size: 1024,
          destination: path.join('icons', 'ios'),
          ios: 'startup',
        },
        {
          src: path.resolve('./ios/DailyScrum/Images.xcassets/AppIcon.appiconset/icon-1024@1x.png'),
          sizes: [36, 48, 72, 96, 144, 192, 512],
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
  ],

  resolve: {
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
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js`.
    extensions: ['.web.js', '.js'],
  },
};
