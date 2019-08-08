import { useState } from "react";
import { Converters, Value } from "de1";
import de1 from ".";

export default function useRead<N extends keyof Converters>(
  name: N
): [Value<Converters, N> | undefined, boolean, () => Promise<void>] {
  const [value, setValue] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const readValue = async () => {
    setLoading(true);
    setValue(await de1.getBleService().read(name));
    setLoading(false);
  };

  return [value, loading, readValue];
}
