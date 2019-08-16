import { useState } from "react";
import { De1Events, De1Listener } from "de1";
import de1 from "../lib/de1";

export default function useEvent<N extends keyof De1Events>(
  name: N
): De1Events[N] | undefined {
  const [isListening, setIsListening] = useState(false);
  const [value, setValue] = useState<De1Events[N] | undefined>(undefined);

  const listener: De1Listener<N> = value => setValue(value);
  const [[persistedListener]] = useState([listener]);

  const start = () => {
    if (isListening) return;
    de1.on(name, persistedListener);
    return setIsListening(true);
  };

  const stop = () => {
    if (!isListening) return;
    de1.off(name, persistedListener);
    return setIsListening(false);
  };

  de1.on("connected", () => start());
  de1.on("disconnected", () => stop());

  if (de1.isConnected()) start();

  return value;
}
