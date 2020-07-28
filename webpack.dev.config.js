const webpack = require( 'webpack' );
const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const dotenv = require( 'dotenv' );
const path = require( 'path' );
const DashboardPlugin = require( "webpack-dashboard/plugin" );

module.exports = () => {
  // call dotenv and it will return an Object with a parsed key 
  const env = dotenv.config({ path: path.resolve('./.env') }).parsed
  
  // reduce it to a nice object, the same as before
  const envKeys = Object.keys( env ).reduce( ( prev, next ) => {
    prev[ `process.env.${ next }` ] = JSON.stringify( env[ next ] );
    return prev;
  }, {} );

  return {
    mode: 'development',
    entry: {
      bundle: [
        '@babel/polyfill',
        './src/index.js',
      ],
    },
    output: {
      path: path.resolve('dist/dev/'),
      publicPath: '/',
      filename: '[name].[hash].js',
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
      runtimeChunk: true,
    },
    devServer: {
      host: '127.0.0.1',
      port: 10001,
      historyApiFallback: true,
      hot: true,
      open: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: { minimize: true }
            }
          ]
        },
        {
          test: /\.css$/,
          loader: "style-loader!css-loader"
        },
        {
          test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
          loader: 'url-loader?limit=100000'
        },
        {
          test: /\.(sa|sc|)ss$/,
          use: ["style-loader", "css-loader", "sass-loader"]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin( envKeys ),
      new DashboardPlugin(),
      new HtmlWebPackPlugin({
        template: "./public/index.html",
        filename: "./index.html",
      } ),
    ],
    resolve: {
      modules: [
        path.join('src'),
        'node_modules',
      ],
      extensions: ['*', '.js', '.jsx', '.css', '.less'],
    },
  }
};