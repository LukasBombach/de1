import { useState, useEffect } from "react";
import { De1Events } from "de1";
import de1 from "../lib/de1";

export default function useEvent<E extends keyof De1Events>(
  event: E
): De1Events[E] | undefined {
  const [value, setValue] = useState<De1Events[E] | undefined>();

  useEffect(() => {
    de1.on(event, setValue);
    return () => {
      de1.off(event, setValue);
    };
  });

  return value;
}
