const nodeExternals = require('webpack-node-externals')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: './src/index.ts',
  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/lib`,
    // 出力ファイル名
    filename: 'index.js',
    libraryTarget: 'this'
  },
  target: 'node',
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        // 拡張子 .ts もしくは .tsx の場合
        test: /\.tsx?$/,
        // TypeScript をコンパイルする
        use: 'ts-loader'
      }
    ]
  },
  // import 文で .ts や .tsx ファイルを解決するため
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  externals: [nodeExternals()],
  plugins: [new CopyPlugin([{ from: 'typings', to: './' }])]
}
