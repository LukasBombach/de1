import { Adapter } from "sblendid";
export default class DE1 {
    static bindings: any;
    private machine?;
    private service?;
    getAdapter(): Adapter;
    static connect(): Promise<DE1>;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    turnOn(): Promise<State>;
    turnOff(): Promise<State>;
    isTurnedOn(): Promise<boolean>;
    startEspresso(): Promise<void>;
    getWaterlevel(): Promise<number>;
    isConnected(): boolean;
    get(name: Prop): Promise<any>;
    set(name: Prop, value: any): Promise<any>;
    on(name: Prop, listener: PropListener<Prop>): Promise<void>;
    off(name: Prop, listener: PropListener<Prop>): Promise<void>;
    private getService;
}
//# sourceMappingURL=de1.d.ts.map