module.exports = {
    publicPath: '/eyetool',
    chainWebpack: config => {
        config
        .plugin('html')
        .tap(args => {
          args[0].title = 'EyeTool'
          return args
        })
    }
}
