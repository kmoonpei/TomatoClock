let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path')
const museUiThemePath = path.join(
  __dirname,
  'node_modules',
  'muse-ui',
  'src/styles/themes/variables/default.less'
)

module.exports = {
  entry: {
    pc: "./resource/pc/main.js"
  },
  devtool: '#inline-source-map',
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.join(__dirname, '/resource/pc'),
      'vue$': 'vue/dist/vue.esm.js',
      'muse-components': 'muse-ui/src'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      //  {
      //   test: /\.vue$/,
      //   loader: 'vue-loader',
      //   options: {
      //     loaders: 'css-loader'
      //   }
      // },
      {
        test: /\.less$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "less-loader" // compiles Less to CSS
        }]
      },
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader"
        }, {
            loader: "sass-loader",
            options: {
                includePaths: ["absolute/path/a", "absolute/path/b"]
            }
        }]
      },
      {
        test: /muse-ui.src.*?js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            less: [
              'vue-style-loader',
              'css-loader',
              {
                loader: 'less-loader',
                options: {
                  globalVars: {
                    museUiTheme: `'${museUiThemePath}'`,
                  }
                }
              }
            ]
          }
        }
      }
    ]
  },
  plugins: [
      // new ExtractTextPlugin("[name].css"),
  ],
  devServer: {
      // contentBase: path.join(__dirname, "dist"),
      disableHostCheck: true,
      compress: true,
      host: '0.0.0.0',
      port: 9000,
      proxy: {
        '/': {
          target: 'http://localhost:3000'
        }
      }
  }
}