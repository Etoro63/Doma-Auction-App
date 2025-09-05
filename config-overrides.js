module.exports = function override(config) {
  config.resolve = config.resolve || {};
  config.resolve.fallback = {
    ...config.resolve.fallback,
    stream: require.resolve('stream-browserify'),
    assert: require.resolve('assert'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    os: require.resolve('os-browserify/browser'),
    url: require.resolve('url')
  };
  config.ignoreWarnings = [
    (warning) =>
      typeof warning.message === 'string' &&
      warning.message.includes('Failed to parse source map')
  ];
  return config;
};
