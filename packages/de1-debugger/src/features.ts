import { states } from "de1";

export default [
  {
    feature: "versions",
    uuid: "a001",
    read: true
  },
  {
    feature: "state",
    uuid: "a002",
    read: true,
    write: true,
    values: Object.keys(states)
  },
  {
    feature: "time",
    uuid: "a003",
    unused: true,
    read: true,
    write: true,
    notify: true
  },
  {
    feature: "shotdir",
    uuid: "a004",
    unused: true,
    read: true
  },
  {
    feature: "readmmr",
    uuid: "a005",
    unused: true,
    read: true,
    write: true
  },
  {
    feature: "writemmrOrFirmwareAck????",
    uuid: "a006",
    purposelyDisabled: true,
    write: true
  },
  {
    feature: "shotMapRequest",
    uuid: "a007",
    unused: true,
    write: true
  },
  {
    feature: "deleteShotRange",
    uuid: "a008",
    unused: true,
    write: true
  },
  {
    feature: "fwMapRequest",
    uuid: "a009",
    purposelyDisabled: true,
    write: true
  },
  {
    feature: "temperatures",
    uuid: "a00a",
    unused: true,
    read: true
  },
  {
    feature: "shotSettings",
    uuid: "a00b",
    read: true,
    write: true
  },
  {
    feature: "shot",
    uuid: "a00d",
    read: true,
    notify: true
  },
  {
    feature: "water",
    uuid: "a011",
    read: true,
    notify: true
  }
];
