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

Each of these ways come with up- and downsides, capabilities and limitations.

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

<sup>1</sup>: Will ask users for permission every time the page is opened and requires them to select the DE1 from a pop up

## TypeScript
