module.exports = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // Important: return the modified config
      config.module.rules.push({
        test: /\.txt/,
        type: 'asset/resource'
      });
      return config;
    },
  }