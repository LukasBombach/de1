import chalk from "chalk";
import DE1 from "../src";

(async () => {
  log("Connecting...");

  const de1 = await DE1.connect();
  const adapter = de1.getBleAdapter();
  const state = await de1.getState();

  await de1.on("state", (...args) => logNotification("Notification", ...args));

  const x = state !== "disconnected";
  await adapter.read("state");
  await adapter.write("state", "idle");

  const y = state !== "XXX";
  await adapter.read("XXX");
  await adapter.write("XXX", "idle");
  await adapter.write("state", "XXX");

  process.exit();
})();

function log(label: string, ...rest: any[]) {
  console.log(chalk.blue(label.padEnd(20, " ")), ...rest);
}

function logNotification(label: string, ...rest: any[]) {
  console.log(chalk.red(label.padEnd(20, " ")), ...rest);
}
