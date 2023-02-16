import { Channel } from '@src/types';
declare const phy: {
    getChannels(physicalInterfaceName: string): Channel[];
};
export default phy;
