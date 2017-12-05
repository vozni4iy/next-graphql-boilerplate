import { createNetworkInterface, HTTPFetchNetworkInterface, Request } from 'apollo-client';
import { ExecutionResult } from 'graphql';

export class CustomNetworkInterface {
  networkInterface: HTTPFetchNetworkInterface;

  constructor(opts: Object) {
    this.networkInterface = createNetworkInterface(opts);
  }

  query(request: Request): Promise<ExecutionResult> {
    return this.networkInterface.query(request);
  }

  use(middlewares: Array<*>) {
    this.networkInterface.use(middlewares);
    return this;
  }

  useAfter(afterwares: Array<*>) {
    this.networkInterface.useAfter(afterwares);
    return this;
  }
}

export function customNetworkInterface(opts: Object) {
  return new CustomNetworkInterface(opts);
}
