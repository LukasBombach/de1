import { useState } from "react";
import { Converters } from "de1";
import de1 from ".";

export default function useNotify(
  name: keyof Converters
): [() => Promise<void>, () => Promise<void>, boolean, any[]] {
  const [values, setValues] = useState([]);
  const [isNotifiying, setIsNotifiying] = useState(false);

  const listener = (value: any) => {
    setValues(values => values.concat(value));
  };

  const [[persistedListener]] = useState([listener]);

  const start = () =>
    de1
      .getBleAdapter()
      .on(name, persistedListener)
      .then(() => setIsNotifiying(true));

  const stop = () =>
    de1
      .getBleAdapter()
      .off(name, persistedListener)
      .then(() => setIsNotifiying(false));

  return [start, stop, isNotifiying, values];
}
