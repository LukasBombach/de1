import chalk from "chalk";
import DE1 from "../src";

(async () => {
  log("Connecting...");
  const de1 = await DE1.connect();
  const adapter = de1.getBleAdapter();
  log("Connected", (await de1.getState()) !== "disconnected");

  await de1.on("state", (...args) => logNotification("Notification", ...args));

  log("State", await adapter.read("stateAA"));

  await adapter.write("state", "idleAAAAA");

  log("State", await adapter.read("state"));

  await adapter.write("stateAAA", "sleepAAAA");

  log("State", await adapter.read("state"));

  process.exit();
})();

function log(label: string, ...rest: any[]) {
  console.log(chalk.blue(label.padEnd(20, " ")), ...rest);
}

function logNotification(label: string, ...rest: any[]) {
  console.log(chalk.red(label.padEnd(20, " ")), ...rest);
}
