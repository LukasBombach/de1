# App Concept Draft

## Purpose of this document

The purpose of this document is to find a common idea of the technological architecture and the purpose of such.

## Technological possibilites

The DE1 can be controlled wirelessly via Bluetooth Low Energy (BLE). This app being based on JavaScript there are
exaclty 4 ways (called "platforms" from hereon) to work with BLE.

- Using Web Bluetooth
- Using Node.js (using a Node.js backend and a seperate / universal frontend)
- Using a mobile app wrapper that provides native APIs to a web view
- Using React Native or NativeScript

Each of these ways come with up- and downsides, capabilities and limitations. The following list shall depict the
benefits and disadvantages relevant to the DE1 app.

| Platform                            | Web Bluetooth | Node.js | Mobile App Wrapper | React Native / NativeScript |
| :---------------------------------- | :-----------: | :-----: | :----------------: | :-------------------------: |
| Can be run without installation     |      ✅       |    -    |         -          |              -              |
| Can be run without permission       |       -       |   ✅    |         ✅         |             ✅              |
| Can control the screen's brightness |       -       |    -    |         ✅         |             ✅              |
| Can control the sleep state         |       -       |    -    |         ✅         |             ✅              |
| Can read the battery level          |       -       |    -    |         ✅         |             ✅              |
| Has appropriate performance         |       ?       |    -    |         ?          |             ✅              |
| Has the best performance            |       -       |    -    |         -          |             ✅              |
| _incomplete_                        |      ...      |   ...   |        ...         |             ...             |

## Progessive enhancement

To make the most use of the advantages possible with each platform while dealing with the disadvantages in the best
possible manner we can go the way of progrssive enhancement. This means we can implement and architecture the can be
used on each platform and enhances with the capabilities the platform provides.

_Draft of the idea:_

[check out this svg's source figma file](https://www.figma.com/file/chZa76r9t1l4oq5UAFYMZW/Sblendid-Architecture?node-id=2%3A5&viewport=199%2C181%2C1)

![](https://raw.githubusercontent.com/LukasBombach/de1/app-concept/packages/specs/concept-flowchart.svg?sanitize=true)

<!-- todo replace with local link once this is merged -->

## Design & UX Concepts

> _**tl;dr** let's use Material UI_

The design and UX of the app is a crutial effort in making this app. It should be a vast improvement over the stock app.
Apart from the generally clear benefits of having a well-deigned user interface and a thought through user experience,
hopefully other users of the DE1 can be convinced to use this app for its joy of use. The goals for the UI include

- Eye candy - The app should be pretty to look at be pleasant to use
- Appropriate usage of animations to make the app fun to use and they should be 60fps
- Most of us have already uttered they'd like to see a "dark" app
- Let's postpone the topic of theming for some time in the future?

By the beginning of a project developers and designers tend to be very excited of the opportunities that can be taken in
this new endeavour. From this, actually good ideas get spawned and the motivation to make these ideas a reality are honest.
Sadly, many of us know the experience that as the project progresses these ideas will be met with the reality of the time
we have at hand and because software projects of a certain size span over months the initial motivation gets lost in the
tedious work of fixing bugs and implementing features that emotionally become chores instead of exciting new ideas.

To meet this problem, we should take the route of least effort and make decisions that enable us to implement usable features
effectively, with clean code and concentration on what we want to achieve rather than how we want to achieve it and not
re-invent the wheel.

Of course, generally speaking this cannot always be done, and some discussions should precisely about how to achieve
a feature rather than what to achieve.

In regards to UI and UX luckily there is a solution for this already, Design Systems with ready-made UI components and a
thought system of UX patterns. We can use a Design System and stick to it at first, _to get things done_ and lateron iterate
on the design. Furthermore, a lot of feature and design decisions become clearer once something can be seen and used, so
it might even be a good idea to start and play around with _something_ rather than trying to hit the nail on the head by
the very beginning of the project.

> This here is a placeholder for a decision matrix on a design system, but frankly, I suggest we use material-ui just
> because of the maturity and feature-richness of this framework

## Features

## TypeScript
