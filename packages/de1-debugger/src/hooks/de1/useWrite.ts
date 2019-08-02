import { useState } from "react";
import de1 from ".";

export default function useWrite(
  feature: String
): [any, (value: any) => Promise<void>] {
  const [loading, setLoading] = useState(false);

  const writeValue = async (value: any) => {
    setLoading(true);
    await de1.set(feature, value);
    setLoading(false);
  };

  return [loading, writeValue];
}
