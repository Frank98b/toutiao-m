// postcss.config.js
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // rootValue: 37.5,
      // 如果是vant样式则按照37.5来转换，如果是自己的样式则按照75来转换
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*']
    }
  }
}
