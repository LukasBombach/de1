import { useState } from "react";
import { Converters, Value } from "de1";
import de1 from "../lib/de1";

export default function useWrite<N extends keyof Converters>(
  name: N
): [boolean, (value: Value<Converters, N>) => Promise<void>] {
  const [loading, setLoading] = useState(false);

  const writeValue = async (value: any) => {
    setLoading(true);
    await de1.getBleService().write(name, value);
    setLoading(false);
  };

  return [loading, writeValue];
}
