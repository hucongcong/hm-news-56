module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // 配置了vant的按需加载
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
