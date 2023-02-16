import { Bandwidth } from '@src/types';
export interface SetChannel {
    type: 'channel';
    channel: number;
    bandwidth?: Bandwidth;
}
export interface SetFreq {
    type: 'freq';
    freq: number;
    bandwidth?: Bandwidth;
}
export interface SetMode {
    type: 'mode';
    mode: 'managed' | 'monitor';
}
export type SetDevCommand = SetChannel | SetFreq | SetMode;
