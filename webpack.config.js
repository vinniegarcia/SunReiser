/*var webpack = require('webpack'),
    path = require('path'),
    AnybarWebpackPlugin = require('anybar-webpack');

module.exports = {

    entry: path.join(__dirname, '/src/app.jsx'),
    module: {
        loaders: [
            { test: /\.(jsx|es6)$/, exclude: /node_modules/, loaders: ['babel-loader?optional=runtime'] }
        ]
    },
    output: {
        path: path.join(__dirname, '/'),
        filename: 'index.ios.js',
        libraryTarget: 'commonjs'
    },
    externals: [],
    resolve: {
        extensions: ['', '.js', '.jsx', '.es6']
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new AnybarWebpackPlugin()
    ]
};*/

var path = require('path');

var webpack = require('webpack');

var reactNativeExternalsPromise = (function () {
  var reactNativeRoot = path.dirname(require.resolve('react-native/package'));
  var blacklist = require('react-native/packager/blacklist');
  var ReactPackager = require('react-native/packager/react-packager');
  var reactNativePackage = require('react-native/package');

  return ReactPackager.getDependencies({
    assetRoots: [reactNativeRoot],
    blacklistRE: blacklist(false),
    projectRoots: [reactNativeRoot],
    transformModulePath: require.resolve('react-native/packager/transformer')
  }, reactNativePackage.main)
    .then(function (dependencies) {
      return dependencies.filter(function (dependency) {
        return !dependency.isPolyfill;
      });
    })
    .then(function (dependencies) {
      return dependencies.map(function (dependency) {
        return dependency.id;
      });
    });
}());

module.exports = {
  debug: true,
  entry: {
    'index.ios': path.join(__dirname, 'src/index.ios')
  },
  externals: [
    function (context, request, cb) {
      reactNativeExternalsPromise.then(function (reactNativeExternals) {
        if (['react-native'].concat(reactNativeExternals).indexOf(request) != -1) {
          cb(null, request);
        } else{
          cb();
        }
      });
    }
  ],
  module: {
    loaders: [
      {test: /\.(js|es6)$/, loader: 'babel?blacklist[]=react', exclude: /node_modules\//},
      {test: /\.(js|jsx)$/, loader: 'imports?React=react-native!babel'},
    ]
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs'
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: true
    })
  ],
  resolve: {
    extensions: [
      '',
      '.es6',
      '.js',
      '.jsx'
    ]
  }
};
