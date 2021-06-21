module.exports = {
    configureWebpack: {
        devtool: 'source-map'
    },
    css: {
        loaderOptions: {
            scss: {
                additionalData: `
                    @import "~@/assets/scss/_variables.scss";
                `
            }
        }
    }
}