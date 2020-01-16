import Sblendid from "@sblendid/sblendid";

(async () => {
  console.log("init");
  console.log("connecting...");
  const de1 = await Sblendid.connect("DE1");
  console.log("connected");
  console.log("getting service...");
  const service = (await de1.getService("a000"))!;
  console.log("got service");

  console.log("getting characteristics...");
  const chcrs = await service.getCharacteristics();
  console.log("got characteristics, reading");

  for (const chcr of chcrs) {
    if (chcr.properties.notify) {
      chcr.on("notify", val => console.log(chcr.uuid, val));
    }
  }

  console.log("Waiting 10s");
  await new Promise(res => setTimeout(res, 10000));

  console.log("disconnect...");
  await de1.disconnect();
  console.log("disconnected");
  console.log("done.");

  process.exit();
})();
