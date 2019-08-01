module.exports = config => {
  const rules = config.module.rules.find(rule => Boolean(rule.oneOf));
  config.target = "electron-renderer";
  config.resolve.extensions.push(".node");

  rules.oneOf.unshift({
    test: /\.node$/,
    loader: require.resolve("native-ext-loader"),
    options: {
      rewritePath:
        "/Users/lbombach/Projekte/DecentEspresso/sblendid/packages/sblendid/lib/"
    }
  });

  return config;
};
