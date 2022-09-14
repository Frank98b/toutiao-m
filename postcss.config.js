// postcss.config.js
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // rootValue: 37.5,
      // 如果是vant样式则按照37.5来转换，如果是自己的样式则按照75来转换
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      //配置要转换的css属性
      //*表示所有
      propList: ['*'],

      //配置不要转换的样式资源
      exclude: 'github-markdown-css'
    }
  }
}
