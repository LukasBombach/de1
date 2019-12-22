import DE1 from "./src/de1";

(async () => {
  try {
    console.log("Test script started");

    console.log("Connecting...");
    const de1 = await DE1.connect();

    console.log("State:", await de1.getState());

    console.log("Connected! Disconnecting...");
    await de1.disconnect();

    console.log("Test script ended");
  } catch (error) {
    console.error(error);
    process.exit();
  }
})();
