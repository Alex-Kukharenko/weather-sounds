import { merge } from 'webpack-merge'
import commonConfig from './webpack.config.common.js'
import ESLintPlugin from 'eslint-webpack-plugin'
export default merge(commonConfig, {
  mode: 'development',
  devtool: [
    { type: 'javascript', use: 'inline-source-map' },
    { type: 'css', use: 'inline-source-map' },
  ],
  plugins: [
    new ESLintPlugin({
      // Опционально: указать расширения файлов
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      // Опционально: исключить папки
      exclude: ['node_modules', 'dist'],
      // emitError: false,      // Не останавливать сборку при ошибках
      //emitWarning: true,     // Показывать предупреждения
      failOnError: false,
    }),
  ],
  devServer: {
    // Порт, на котором будет запущен сервер разработки
    // По умолчанию используется порт 8080
    port: 3000,

    // Открывает браузер автоматически при запуске сервера
    open: false,

    // Настройки для live reload
    hot: true, // Включает горячую перезагрузку модулей
    liveReload: true,
  }
})