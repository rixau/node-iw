import {execSync} from 'child_process';
import handleError from '@src/error';
import {SetDevCommand} from '@src/types';

const dev = {
  set(networkInterface: string, options: SetDevCommand) {
    try {
      switch (options.type) {
        case 'channel': {
          execSync(
            `iw dev ${networkInterface} set channel ${options.channel} ${
              options.bandwidth || ''
            }`,
            {stdio: 'pipe'}
          );
          return;
        }
        case 'freq': {
          execSync(
            `iw dev ${networkInterface} set freq ${options.freq} ${
              options.bandwidth || ''
            }`,
            {stdio: 'pipe'}
          );
          return;
        }
        case 'mode': {
          if (options.mode === 'monitor') {
            execSync(`sudo iw ${networkInterface} set monitor none`, {
              stdio: 'pipe',
            });
          } else if (options.mode === 'managed') {
            execSync(`sudo iw ${networkInterface} set type managed`, {
              stdio: 'pipe',
            });
          }
          return;
        }
      }
    } catch (error: unknown) {
      handleError(error, networkInterface);
    }
  },
  info() {
    const output = execSync('iw dev').toString();
    const devs = output
      .split('phy')
      .filter(e => e !== '')
      .map(e => {
        return {
          interface: e.match(/(?<=Interface )(.*)(?=\n|\t)/g)?.at(0) || null,
          ifindex: e.match(/(?<=ifindex )(.*)(?=\n|\t)/g)?.at(0) || null,
          wdev: e.match(/(?<=wdev )(.*)(?=\n|\t)/g)?.at(0) || null,
          addr: e.match(/(?<=addr )(.*)(?=\n|\t)/g)?.at(0) || null,
          txpower: e.match(/(?<=txpower )(.*)(?=\n|\t)/g)?.at(0) || null,
        };
      });
    return devs;
  },
};

export default dev;
