import { useState } from "react";
import { Converters, Value } from "de1";
import de1 from "../lib/de1";

export default function useNotify<N extends keyof Converters>(
  name: N
): Value<Converters, N> | undefined {
  const [value, setValue] = useState<Value<Converters, N> | undefined>(
    undefined
  );
  const [isNotifiying, setIsNotifiying] = useState(false);

  const listener = (value: Value<Converters, N>) => setValue(value);

  const [[persistedListener]] = useState([listener]);

  const start = async () => {
    if (isNotifiying) return;
    await de1.getBleService().on(name, persistedListener);
    return setIsNotifiying(true);
  };

  const stop = async () => {
    if (!isNotifiying) return;
    await de1.getBleService().off(name, persistedListener);
    return setIsNotifiying(false);
  };

  de1.on("connected", () => start());
  de1.on("disconnected", () => stop());

  if (de1.isConnected()) start();

  return value;
}
