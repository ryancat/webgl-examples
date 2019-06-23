// Export a function. Accept the base config as the only param.
module.exports = async ({ config }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  config.module.rules.push({
    test: /\.stories\.tsx?$/,
    loaders: [{
      loader: require.resolve('@storybook/addon-storysource/loader'),
      options: {
        parser: 'typescript'
      }
    }],
    enforce: 'pre',
  }, {
    test: /\.js$/,
    loader: 'source-map-loader'
  }, {
    test: /\.(js|ts)x?$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    enforce: 'post',
  }, {
    test: /\.glsl$/,
    loader: 'raw-loader',
    exclude: /node_modules/
  });

  // Do not minimize for internal docs
  // TODO: minimize doc for external docs
  // Note: Minimize with TenserPlugin will cause the epic 92% chunk asset optimization issue
  // Essentially this package may run out of memory...
  // See https://github.com/webpack-contrib/uglifyjs-webpack-plugin/issues/272
  config.optimization.minimize = false;

  // Return the altered config
  return config;
};