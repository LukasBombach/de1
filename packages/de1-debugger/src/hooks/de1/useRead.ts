import { useState } from "react";
import de1 from ".";

export default function useRead(
  feature: String
): [any, boolean, () => Promise<void>] {
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(false);

  const readValue = async () => {
    setLoading(true);
    setValue(await de1.get(feature));
    setLoading(false);
  };

  return [value, loading, readValue];
}
