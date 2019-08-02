import chalk from "chalk";
import DE1 from "../src";

(async () => {
  const de1 = await DE1.connect();

  log("Connected", de1.isConnected());

  log("State reading 1", await de1.get("state"));

  await new Promise(res => setTimeout(res, 1000));

  log("State reading 2", await de1.get("state"));

  process.exit();
})();

function log(label: string, ...rest: any[]) {
  console.log(chalk.blue(label.padEnd(20, " ")), ...rest);
}
