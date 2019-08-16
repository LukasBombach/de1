import { useState, useEffect } from "react";
import { Feature, Value } from "de1";
import de1 from "../lib/de1";

export default function useNotify<F extends Feature>(
  name: F
): Value<F> | undefined {
  const [value, setValue] = useState<Value<F>>();

  useEffect(() => {
    de1.getBleService().on(name, setValue);
    return () => {
      de1.getBleService().off(name, setValue);
    };
  });

  return value;
}
