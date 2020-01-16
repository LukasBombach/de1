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
    console.log(chcr.uuid, await chcr.read());
  }

  console.log("disconnect...");
  await de1.disconnect();
  console.log("disconnected");
  console.log("done.");

  process.exit();
})();
