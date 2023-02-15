import {execSync} from 'child_process';
import handleError from './error';
import {Bandwidth, Channel} from '@src/types';

const phy = {
  getChannels(physicalInterfaceName: string) {
    let channels: Channel[] = [];
    try {
      const output = execSync(
        `iw phy ${physicalInterfaceName} channels`
      ).toString();
      channels = output
        .split('*')
        .filter(e => e !== '' && !e.match(/.*(disabled).*/g))
        .map(e => {
          const freq =
            parseInt(
              e.match(/(?<= )([0-9][0-9][0-9][0-9])(?= MHz)/g)?.at(0) || ''
            ) || -1;
          const txPower =
            parseInt(
              e
                .match(/(?<=Maximum TX power:.)([0-9][0-9]\.[0-9]+)(?=.*dBm)/g)
                ?.at(0) || ''
            ) || -1;
          const channel =
            parseInt(e.match(/(?<=MHz \[)([0-9]+)(?=\])/g)?.at(0) || '') || -1;
          const widths: Bandwidth[] =
            e
              .match(/(?<=Channel widths: ).*/g)
              ?.at(0)
              ?.split(' ')
              .map(e => e as Bandwidth) || [];
          return {channel, freq, txPower, widths};
        })
        .filter(e => e.channel > 0);
    } catch (error: unknown) {
      handleError(error, physicalInterfaceName);
    }
    return channels;
  },
};

export default phy;
