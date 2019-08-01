const compat = require("sblendid-compat");
const BuiltinModule = require("module");

const Module =
  module.constructor.length > 1 ? module.constructor : BuiltinModule;

const oldResolve = Module._resolveFilename;

Module._resolveFilename = function(request, parentModule, isMain) {
  if (["noble", "noble/lib/noble"].indexOf(request) !== -1) {
    request = "sblendid-compat";
  }
  return oldResolve(request, parentModule, isMain);
};

const DE1 = require("de1").default;

(async () => {
  console.log("Connecting...");
  const de1 = await DE1.connect();
  const state = await de1.get("state");
  console.log("state", state);
  process.exit();
})();
