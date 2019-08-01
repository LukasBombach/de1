module.exports = config => {
  config.target = "electron-renderer";
  config.resolve.extensions.push("node");
  config.module.rules.push({ test: /\.node$/, use: "node-loader" });
  return config;
};
