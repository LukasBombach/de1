import { useState } from "react";
import de1 from ".";

export default function useConnection(): [
  boolean,
  () => Promise<void>,
  () => Promise<void>
] {
  const [isConnnected, setIsConnected] = useState(de1.isConnected());

  const connect = () => de1.connect().then(() => setIsConnected(true));
  const disconnect = () => de1.disconnect().then(() => setIsConnected(false));

  return [isConnnected, connect, disconnect];
}
