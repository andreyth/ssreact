const { resolve } = require('path')
const webpack = require('webpack')
var nodeExternals = require('webpack-node-externals')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const paths = {
  src: resolve(__dirname, '..', 'src'),
  public: resolve(__dirname, '..', 'public'),
  dist: resolve(__dirname, '..', 'build-server'),
  server: resolve(__dirname, '..', 'src', 'server'),
  shared: resolve(__dirname, '..', 'src', 'shared')
}

const includesPath = [paths.server, paths.shared]

const optimization = () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      optimization: {
        minimizer: [
          new UglifyJsPlugin({
            uglifyOptions: {
              output: {
                comments: false
              }
            }
          })
        ]
      }
    }
  }
  return {
    devtool: 'eval-source-map'
  }
}

module.exports = {
  entry: resolve(paths.server, 'index'),
  target: 'node',
  externals: [nodeExternals()],
  node: {
    __dirname: false
  },
  output: {
    path: paths.dist,
    filename: 'server.js'
    // libraryTarget: 'commonjs2'
    // publicPath: '/'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        include: includesPath,
        loader: 'standard-loader',
        options: {
          parser: 'babel-eslint'
        }
      },
      {
        test: /\.js$/,
        include: includesPath,
        loader: 'babel-loader',
        query: {
          presets: [
            ['@babel/preset-env', { 'modules': false }],
            '@babel/preset-react'
          ],
          plugins: [
            'dynamic-import-node-babel-7',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-transform-runtime',
            'loadable-components/babel'
            // 'react-loadable/babel'
          ]
        }
      },
      {
        test: /\.scss|.css$/,
        include: includesPath,
        use: ['css-loader?modules', 'sass-loader']
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
        // exclude: /node_modules/,
        include: includesPath,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1,
            name: 'media/[name].[hash:8].[ext]',
            emitFile: false
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: 'false'
    }),
    new CleanWebpackPlugin()
  ],
  resolve: {
    alias: {
      'src': paths.src,
      'shared': paths.shared,
      'components': resolve(paths.shared, 'components')
      // 'react': 'preact-compat',
      // 'react-dom': 'preact-compat'
    }
  },
  ...optimization(),
  stats: {
    all: false,
    errors: true,
    warnings: true,
    moduleTrace: true,
    errorDetails: true,
    assets: true,
    performance: true,
    assetsSort: '!size',
    source: false
  }
}
