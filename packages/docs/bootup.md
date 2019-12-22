```typescript
import DE1 from "de1";

(async () => {
  const de1 = await DE1.connect();
  await de1.turnOn();

  de1.on("state", state => {
    if (state === "heating") {
      console.log("heating");
    } else if (state === "idle") {
      console.log("Machine ready");
      process.exit();
    }
  });

  de1.on("heating", info => {
    console.log("temperature", info.temp);
    console.log("goal", info.goal);
    console.log("time", info.time);
    console.log("time left", info.timeLeft);
  });
})();
```
