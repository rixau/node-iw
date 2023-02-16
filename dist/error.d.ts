export declare class OperationNotPermittedError extends Error {
    constructor(networkInterface: string);
}
export declare class DeviceOrResourceBusy extends Error {
    constructor(networkInterface: string);
}
export declare class GenericError extends Error {
    constructor(networkInterface: string);
}
declare const handleError: (error: unknown, networkInterface: string) => never;
export default handleError;
