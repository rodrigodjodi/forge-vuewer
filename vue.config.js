module.exports = {
  lintOnSave: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        //ws: true,
        changeOrigin: false
      }
    }
  }
};
