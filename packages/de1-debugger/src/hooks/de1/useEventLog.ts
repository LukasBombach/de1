import de1 from ".";

const events: any[] = [
  "stateChange",
  "discover",
  "connect",
  "disconnect",
  "rssiUpdate",
  "servicesDiscover",
  "includedServicesDiscover",
  "characteristicsDiscover",
  "read",
  "write",
  "broadcast",
  "notify",
  "descriptorsDiscover",
  "valueRead",
  "valueWrite",
  "handleRead",
  "handleWrite",
  "handleNotify",
  "scanStart",
  "scanStop"
];

export default function useEventLog(): void {
  if (de1.isConnected()) {
    for (const event of events) {
      de1
        .getAdapterForDebugging()
        .on(event, (...args) => console.info(...args));
    }
  }
}
