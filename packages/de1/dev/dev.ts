import Machine from "../src/machine";

(async () => {
  console.log("init");
  const machine = new Machine();

  console.log("connecting...");
  await machine.connect();
  console.log("connected");

  console.log("state", await machine.read("state"));
  console.log("water", await machine.read("water"));
  console.log("versions", await machine.read("versions"));
  console.log("shot", await machine.read("shot"));
  console.log("shotSettings", await machine.read("shotSettings"));
  console.log("stateInfo", await machine.read("stateInfo"));
  console.log(
    "shotDescriptionHeader",
    await machine.read("shotDescriptionHeader"),
  );
  console.log("shotFrame", await machine.read("shotFrame"));

  console.log("calibrate", await machine.read("calibrate"));

  console.log("disconnect...");
  await machine.disconnect();
  console.log("disconnected");
  console.log("done.");
  process.exit();
})();
