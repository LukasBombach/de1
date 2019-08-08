import { useState } from "react";
import { Converters, Value } from "de1";
import de1 from ".";

export default function useNotify<N extends keyof Converters>(
  name: N
): [() => Promise<void>, () => Promise<void>, boolean, Value<Converters, N>[]] {
  const [values, setValues] = useState([]);
  const [isNotifiying, setIsNotifiying] = useState(false);

  const listener = (value: any) => {
    setValues(values => values.concat(value));
  };

  const [[persistedListener]] = useState([listener]);

  const start = () =>
    de1
      .getBleService()
      .on(name, persistedListener)
      .then(() => setIsNotifiying(true));

  const stop = () =>
    de1
      .getBleService()
      .off(name, persistedListener)
      .then(() => setIsNotifiying(false));

  return [start, stop, isNotifiying, values];
}
