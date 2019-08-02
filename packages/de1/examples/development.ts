import chalk from "chalk";
import DE1 from "../src";

(async () => {
  log("Connecting...");
  const de1 = await DE1.connect();
  log("Connected", de1.isConnected());

  await de1.on("state", (...args) => logNotification("Notification", ...args));

  log("State", await de1.get("state"));

  await de1.set("state", "idle");

  log("State", await de1.get("state"));

  await de1.set("state", "sleep");

  log("State", await de1.get("state"));

  process.exit();
})();

function log(label: string, ...rest: any[]) {
  console.log(chalk.blue(label.padEnd(20, " ")), ...rest);
}

function logNotification(label: string, ...rest: any[]) {
  console.log(chalk.red(label.padEnd(20, " ")), ...rest);
}
