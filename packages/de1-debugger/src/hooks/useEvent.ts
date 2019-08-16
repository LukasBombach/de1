import { useState, useEffect } from "react";
import { Event, EventValue } from "de1";
import de1 from "../lib/de1";

export default function useEvent<E extends Event>(
  event: E
): EventValue<E> | undefined {
  const [value, setValue] = useState<EventValue<E> | undefined>();

  useEffect(() => {
    de1.on(event, setValue);
    return () => {
      de1.off(event, setValue);
    };
  });

  return value;
}
