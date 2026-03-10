import { merge } from 'webpack-merge'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import commonConfig from './webpack.config.common.js'


export default merge(commonConfig, {
  mode: 'production',
  devtool: [
    { type: "javascript", use: 'source-map' },
    { type: "css", use: 'source-map' },
  ],
  plugins: [new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: false,
    reportFilename: 'report.html'
  })],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          chunks: 'all',
          name: 'vendor',
          test: /node_modules/,
        }
      }
    }
  },
}) 
