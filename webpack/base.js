var path = require('path')
var webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var ExtractTextPlugin = require('mini-css-extract-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin');
//var CopyWebpackPlugin = require('copy-webpack-plugin')

//, './src/style/main.css', 'bootstrap/dist/css/bootstrap.css'
module.exports = {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            query: {
              presets: ["@babel/preset-env"]
            }
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ["@babel/preset-env"]
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: ExtractTextPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '../../',
              minimize: false,
            }
          },
          "css-loader"
        ]
      },
      {
        test: /\.(png|gif|svg|ttf|woff)$/,
        loader: 'file-loader',
        options: {
          name: 'static/file/[name].[ext]',
        }
      },
      {
        test: /\.(jpg)$/,
        loader: 'file-loader',
        options: {
          name: 'static/file/[name].[ext]'
        }
      }

    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: "static/css/[name].css",
      chunkFilename: "[id].css"
    }),
   /* new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'example/index.html',
      inject: 'true',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/static',
        to: './',
        ignore: ['.*']
      }
    ])*/
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: false
        }
      })
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
  //    'vue$': 'vue/dist/vue.esm.js'
    },
    modules: [
      path.resolve('./node_modules'),
      path.resolve('./src')
    ]
  },
  performance: {
    hints: false
  },
  devtool: '#source-map',
}
