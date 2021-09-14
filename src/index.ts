import {
  TModule,
  TModuleStore,
  TApi,
  TEnvironment,
  ICoreSDK,
  TNetworkManager,
  TCoreSDKParameters
} from './constants/type';

import ClassSAssign from './assign';
import Fetch from './manager/fetch';
import {
  SDKProxyHandler,
  NetworkManagerProxyHandler
} from './proxy';

class CoreSDK implements ICoreSDK {
  readonly apiKey: string = '';
  readonly type: TApi = 'PUBLIC';
  readonly environment: TEnvironment = 'DEVELOPMENT';
  readonly apiURL: string = 'https://api.jotform.com';

  moduleStore: TModuleStore = {};
  networkManager: TNetworkManager = Fetch;

  constructor(parameters: TCoreSDKParameters) {
    new ClassSAssign(parameters, this).apply();

    switch (true) {
      case this.type === 'PRIVATE':
      case this.environment === 'ENTERPRISE':
      case this.environment === 'DEVELOPMENT':
        this.apiURL = '/API';
        break;
      default:
        break;
    }
  }

  registerModule(module: TModule) {
    const { name, functionList } = module;
    this.moduleStore[name] = Object.entries(functionList).reduce((prev, [key, fn]) => ({
      ...prev,
      [key]: fn(this.networkManager)
    }), {});
  }

  registerNetworkManager(networkManager: TNetworkManager) {
    this.networkManager = new Proxy(networkManager, NetworkManagerProxyHandler);
  }
}

const createSDK = function(parameters: TCoreSDKParameters, forceNewInstance: boolean = false) {
  if (!forceNewInstance && (self as any).jotformSDK) {
    return (self as any).jotformSDK;
  }

  const sdkInstance = new Proxy(new CoreSDK(parameters), SDKProxyHandler);
  (self as any).jotformSDK = sdkInstance;
  return sdkInstance;
};

export default createSDK;

