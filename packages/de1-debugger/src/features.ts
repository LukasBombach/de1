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
    notify: true,
    values: Object.keys(states)
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
