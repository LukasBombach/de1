const path = require("path");

module.exports = config => {
  const scopePluginIndex = config.resolve.plugins.findIndex(
    ({ constructor }) => constructor && constructor.name === "ModuleScopePlugin"
  );

  config.target = "electron-renderer";
  config.resolve.plugins.splice(scopePluginIndex, 1);

  addDe1ToInclude(config.module.rules);

  return config;
};

const de1Path = path.resolve(__dirname, "../de1/src");
const sblendidPath = path.resolve(__dirname, "../de1/sblendid");

addDe1ToInclude(rules => {
  if (rules.oneOf) addDe1ToInclude(rules.oneOf);
  for (const rule of rules) {
    if (typeof rule.include === "string") rule.include = [rule.include];
    if (Array.isArray(rule.include)) rule.include.push(de1Path, sblendidPath);
  }
});

/*

  console.log(
    require("util").inspect(config.module.rules, {
      depth: 10
    })
  );
*/
