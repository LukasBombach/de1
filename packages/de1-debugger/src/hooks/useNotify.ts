import { useState } from "react";
import { Feature, Value } from "de1";
import de1 from "../lib/de1";

export default function useNotify<F extends Feature>(
  name: F
): Value<F> | undefined {
  const [value, setValue] = useState<Value<F> | undefined>();

  const start = () => de1.getBleService().on(name, setValue);
  const stop = () => de1.getBleService().off(name, setValue);

  de1.on("connected", () => start());
  de1.on("disconnected", () => stop());

  if (de1.isConnected()) start();

  return value;
}
