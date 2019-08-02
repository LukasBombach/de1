import chalk from "chalk";
import DE1 from "../src";

(async () => {
  log("Connecting...");
  const de1 = await DE1.connect();
  log("Connected", de1.isConnected());

  // const a002 = await de1.get("a002");
  // log("a002", a002.toString("hex"));

  log("State", await de1.get("state"));

  process.exit();
})();

function log(label: string, ...rest: any[]) {
  console.log(chalk.blue(label.padEnd(20, " ")), ...rest);
}
