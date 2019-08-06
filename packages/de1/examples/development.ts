import chalk from "chalk";
import DE1 from "../src";

(async () => {
  log("Connecting...");

  const de1 = await DE1.connect();
  const service = de1.getBleService();
  const adapter = de1.getBleAdapterforDebugging();

  log("Connected");

  await service.write("state", "sleep");

  process.exit();
})();

function log(label: string, ...rest: any[]) {
  console.log(chalk.blue(label.padEnd(20, " ")), ...rest);
}

function logNotification(label: string, ...rest: any[]) {
  console.log(chalk.red(label.padEnd(20, " ")), ...rest);
}
