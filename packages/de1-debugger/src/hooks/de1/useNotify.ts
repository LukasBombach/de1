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

  const start = () =>
    de1.on(feature, listener).then(() => setIsNotifiying(true));
  const stop = () =>
    de1.off(feature, listener).then(() => setIsNotifiying(false));

  return [start, stop, isNotifiying, values];
}
