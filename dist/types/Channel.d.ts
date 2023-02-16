import { Bandwidth } from './Bandwidth';
export interface Channel {
    channel: number;
    freq: number;
    txPower: number;
    widths: Bandwidth[];
}
