import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
const isDev = process.env.NODE_ENV !== 'production';

const everythingExceptNodeModulesLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
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
      ],
    },
  },
};

const modulesLoader = {
  test: /\.js$/,
  include: [/node_modules\/react-native-/, /node_modules\/react-navigation/, /node_modules\/easy-lottie-react-native/],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: !isDev,
      presets: ['react-native'],
    },
  },
};

// This is needed for webpack to import static images in JavaScript files
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
    },
  },
};

const fontLoaderConfiguration = {
  test: /\.ttf$/,
  loader: 'file-loader',
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
    rules: [everythingExceptNodeModulesLoader, modulesLoader, imageLoaderConfiguration, fontLoaderConfiguration],
  },

  plugins: [
    // `process.env.NODE_ENV === 'production'` must be `true` for production
    // builds to eliminate development checks and reduce build size.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      __DEV__: JSON.stringify(isDev),
    }),
    new HtmlWebpackPlugin({
      title: 'DailyScrum',
      filename: 'index.html',
      template: 'web/src/index.html',
    }),
  ],

  resolve: {
    // Maps the 'react-native' import to 'react-native-web' and the stubs or mocks.
    alias: {
      'react-native': 'react-native-web',
      'react-navigation': 'react-navigation/src/react-navigation.js',
      FlatList: path.join(__dirname, 'src/mocks/FlatList'),
      Modal: path.join(__dirname, 'src/mocks/unimplemented'),
      Picker: path.join(__dirname, 'src/mocks/Picker'),
      'react-native-linear-gradient': 'react-native-web-linear-gradient',
      'react-native-code-push': path.join(__dirname, 'src/mocks/react-native-code-push'),
      'react-native-svg': path.join(__dirname, 'src/mocks/react-native-svg'),
      'lottie-react-native': path.join(__dirname, 'src/mocks/lottie-react-native'),
      'react-native-safari-view': path.join(__dirname, 'src/mocks/unimplemented'),
      'react-native-splash-screen': path.join(__dirname, 'src/mocks/react-native-splash-screen'),
      'react-native-firebase': path.join(__dirname, 'src/mocks/react-native-firebase'),
    },
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js`.
    extensions: ['.web.js', '.js'],
  },
};
