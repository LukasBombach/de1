import { useState } from "react";
import { Converters, Value } from "de1";
import de1 from "../lib/de1";

type ConverterKey = keyof Converters;
type ConverterValue<N extends ConverterKey> = Value<Converters, N>;
type NotifyValue<N extends ConverterKey> = ConverterValue<N> | undefined;

function useNotify<N extends ConverterKey>(name: N): NotifyValue<N> {
  const [value, setValue] = useState<NotifyValue<N>>();

  const start = () => de1.getBleService().on(name, setValue);
  const stop = () => de1.getBleService().off(name, setValue);

  de1.on("connected", () => start());
  de1.on("disconnected", () => stop());

  if (de1.isConnected()) start();

  return value;
}

export default useNotify;
