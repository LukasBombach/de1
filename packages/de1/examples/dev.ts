import chalk from "chalk";
import DE1 from "../src";

(async () => {
  try {
    console.log("connecting...");
    const de1 = await DE1.connect();

    console.log("reading");
    await de1.get("state");

    await de1.on("state", (state: string, ...args) =>
      console.log(chalk.blue("state notification"), state, ...args)
    );

    console.log("reading");
    await de1.get("state");

    console.log("turning on");
    await de1.turnOn();

    console.log("reading");
    await de1.get("state");

    console.log("turning off");
    await de1.turnOff();

    console.log("reading");
    await de1.get("state");

    console.log("end");

    console.log("disconnecting");
    await de1.disconnect();
    process.exit();
  } catch (error) {
    console.error(error);
  }
})();
