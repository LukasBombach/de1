# DE1 lib Api

What do we want to do?

- Connect to / Disconnect from the DE1
- Turn the DE1 on / off
- Start / Stop espresso
- Start / Stop steam
- Start / Stop hot water
- Start / Stop flush
- Start / Stop descaling
- Stop everything?
- Read the current state (espresso, flushing, ...)
- Read the water level
- Read the group head temperature
- Read other temperatures
- Set espresso settings
- Set other settings

In this list I am not sure right now

1. Which temperatures there are to read (I am on the train right now and would need to do some digging)
1. Which settings can be set

The second point is a tricky one. As I understand it, you can set the espresso settings
just as you would set them in the stock app. I.e. you choose values for the preinfusion,
the pouring and the drop off. Then you would save them and later just then the command
"start the espresso". The espresso would then be poured according to the settings. I talked
to some DE1 engineer about this and he said everything can be set up in any way. I am not
sure what he meant because I feel like the description I just wrote is about right and the
workflow I described (setting -> then pouring) is too. But that needs more investigation.

```ts
abstract class DE1 {
  public abstract async connect(): Promise<void>;
  public abstract async disconnect(): Promise<void>;
  public abstract async turnOn(): Promise<void>;
  public abstract async turnOff(): Promise<void>;
  public abstract async startEspresso(): Promise<void>;
  public abstract async stopEspresso(): Promise<void>;
  public abstract async startSteam(): Promise<void>;
  public abstract async stopSteam(): Promise<void>;
  public abstract async startHotWater(): Promise<void>;
  public abstract async stopHotWater(): Promise<void>;
  public abstract async startFlushing(): Promise<void>;
  public abstract async stopFlushing(): Promise<void>;
  public abstract async startDescaling(): Promise<void>;
  public abstract async stopDescaling(): Promise<void>;
  public abstract async getWaterlevel(): Promise<number>;
  public abstract async getTemperatures(): Promise<Temperatures>;
  public abstract async setXXX(): Promise<void>;
}

interface Temperatures {
  groupHead: number;
  steam: number;
  /* ... */
}
```

# DE1 GraphQL Api

I assume the GraphQL Api would be somewhat the same as the lib api, what do you think?

I think we should write an own Apollo connector for the DE1

https://github.com/apollographql/graphql-tools/blob/master/designs/connectors.md
