const { resolve } = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const LoadablePlugin = require('@loadable/webpack-plugin')

const paths = {
  src: resolve(__dirname, '..', 'src'),
  dist: resolve(__dirname, '..', 'public'),
  client: resolve(__dirname, '..', 'src', 'client'),
  shared: resolve(__dirname, '..', 'src', 'shared')
}

const tempPlugin = () => {
  if (process.env.PLAT === 'client') {
    return [
      new HtmlPlugin({
        filename: 'index.html',
        template: resolve(__dirname, 'template', 'template.ejs'),
        chunksSortMode: (chunk1, chunk2) => {
          const order = ['react-build', 'common', 'main']
          const left = order.indexOf(chunk1.names[0])
          const right = order.indexOf(chunk2.names[0])
          return left - right
        }
      })
    ]
  }

  return []
}

const includesPath = [paths.client, paths.shared]

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    main: resolve(paths.client, 'index')
  },
  output: {
    path: paths.dist,
    filename: 'static/[name].js'
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
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-transform-runtime',
            '@loadable/babel-plugin',
            'babel-plugin-styled-components'
          ]
        }
      },
      {
        test: /\.scss|.css$/,
        include: includesPath,
        use: ['style-loader', 'css-loader?modules', 'sass-loader']
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
        // exclude: /node_modules/,
        include: includesPath,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1,
            name: 'media/[name].[hash:8].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: 'true',
      __platform__: JSON.stringify(process.env.PLAT)
    }),
    ...tempPlugin(),
    new LoadablePlugin(),
    new CleanWebpackPlugin()
  ],
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
  },
  resolve: {
    alias: {
      'src': paths.src,
      'shared': paths.shared,
      'components': resolve(paths.shared, 'components')
    }
  },
  optimization: {
    // runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        reactBuild: {
          name: 'reactBuild',
          chunks: 'all',
          test ({ resource }, chunks) {
            return /node_modules\/(react|react-dom)/.test(resource)
          }
        },
        commons: {
          name: 'common',
          chunks: 'all',
          test ({ resource }, chunks) {
            return /node_modules\/(?!(react|react-dom))/.test(resource)
          }
        }
      }
    }
  }
}
