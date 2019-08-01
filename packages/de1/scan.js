const chalk = require("chalk");
const DE1 = require(".");

(async () => {
  const de1 = new DE1();
  await de1.scanForDebugging();
})();
