# App Concept Draft

## Purpose of this document

The purpose of this document is to find a common idea of the technological architecture and the purpose of such.

## Core Concepts

The DE1 can be controlled wirelessly via Bluetooth Low Energy (BLE). This app being based on JavaScript there are
exaclty 4 ways (called "platforms" from hereon) to work with BLE.

- Using Web Bluetooth
- Using Node.js (using a Node.js backend and a seperate / universal frontend)
- Using a mobile app wrapper that provides native APIs to a web view
- Using React Native or NativeScript

Each of these ways come with up- and downsides, capabilities and limitations. The following list shall depict the
benefits and disadvantages relevant to the DE1 app.

| Platform                        | Web Bluetooth | Node.js | Mobile App Wrapper | React Native / NativeScript |
| :------------------------------ | :-----------: | :-----: | :----------------: | :-------------------------: |
| Can be run without installation |      ✅       |    -    |         -          |              -              |
| Can be run without permission   |       -       |   ✅    |         ✅         |             ✅              |
|                                 |               |         |                    |                             |
|                                 |               |         |                    |                             |
|                                 |               |         |                    |                             |
|                                 |               |         |                    |                             |
|                                 |               |         |                    |                             |
|                                 |               |         |                    |                             |
|                                 |               |         |                    |                             |
|                                 |               |         |                    |                             |
|                                 |               |         |                    |                             |
|                                 |               |         |                    |                             |
|                                 |               |         |                    |                             |

## TypeScript
