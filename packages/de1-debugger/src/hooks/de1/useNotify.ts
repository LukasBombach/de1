import { useState } from "react";
import de1 from ".";

export default function useNotify(
  feature: String
): [() => Promise<void>, () => Promise<void>, boolean, any[]] {
  const [values, setValues] = useState([]);
  const [isNotifiying, setIsNotifiying] = useState(false);

  const listener = (value: any) => {
    setValues(values => values.concat(value));
  };

  const [[persistedListener]] = useState([listener]);

  const start = () =>
    de1.on(feature, persistedListener).then(() => setIsNotifiying(true));
  const stop = () =>
    de1.off(feature, persistedListener).then(() => setIsNotifiying(false));

  return [start, stop, isNotifiying, values];
}
