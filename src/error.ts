export class OperationNotPermittedError extends Error {
  constructor(networkInterface: string) {
    super(`Failed to execute command: ${networkInterface}`); // (1)
    this.name = 'OperationNotPermittedError'; // (2)
  }
}
export class DeviceOrResourceBusy extends Error {
  constructor(networkInterface: string) {
    super(`Could not access device: ${networkInterface}`); // (1)
    this.name = 'DeviceOrResourceBusy'; // (2)
  }
}
export class GenericError extends Error {
  constructor(networkInterface: string) {
    super(`Failed to execute command: ${networkInterface}`); // (1)
    this.name = 'FailedCommandError'; // (2)
  }
}

const handleError = (error: unknown, networkInterface: string) => {
  const message = 'Unknown Error';

  if (error instanceof Error) {
    if (error.message.match(/Operation not permitted/)) {
      throw new OperationNotPermittedError(networkInterface);
    }
    if (error.message.match(/Device or resource busy/)) {
      throw new DeviceOrResourceBusy(networkInterface);
    }
    throw new GenericError(networkInterface);
  }

  throw new Error(message);
};
export default handleError;
