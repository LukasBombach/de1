import { useState } from "react";
import { Converters } from "de1";
import de1 from ".";

export default function useRead(
  name: keyof Converters
): [any, boolean, () => Promise<void>] {
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(false);

  const readValue = async () => {
    setLoading(true);
    setValue(await de1.getBleAdapter().read(name));
    setLoading(false);
  };

  return [value, loading, readValue];
}
