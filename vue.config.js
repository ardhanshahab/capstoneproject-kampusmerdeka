const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    proxy: 'https://go-hospital-server.herokuapp.com/api/',
    },
  transpileDependencies: true
})
