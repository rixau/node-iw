declare const iw: {
    dev: {
        set(networkInterface: string, options: import("./types").SetDevCommand): void;
        info(): {
            interface: string | null;
            ifindex: string | null;
            wdev: string | null;
            addr: string | null;
            txpower: string | null;
        }[];
    };
    phy: {
        getChannels(physicalInterfaceName: string): import("./types").Channel[];
    };
};
export default iw;
