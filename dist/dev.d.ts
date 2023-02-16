import { SetDevCommand } from '@src/types';
declare const dev: {
    set(networkInterface: string, options: SetDevCommand): void;
    info(): {
        interface: string | null;
        ifindex: string | null;
        wdev: string | null;
        addr: string | null;
        txpower: string | null;
    }[];
};
export default dev;
