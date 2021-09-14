export type TNetworkManager = {
  get: (url: string) => void
}

export type TModuleFunction = (networkManager: TNetworkManager) => () => any;

export type TModuleFunctionList = {
  [key: string]: TModuleFunction
};

export type TModule = {
  name: string,
  functionList: TModuleFunctionList
};

export type TApi = 'PRIVATE' | 'PUBLIC';

export type TEnvironment = 'DEVELOPMENT' | 'TESTING' | 'PRODUCTION' | 'ENTERPRISE';

export type TModuleStore = {
  [key: string]: TModuleFunctionList
}

export interface ICoreSDK {
  readonly type: TApi;
  readonly apiKey?: string;
  readonly apiURL?: string;
  readonly environment: TEnvironment;
  moduleStore: TModuleStore;
  networkManager: TNetworkManager;
}

export type TCoreSDKParameters =  {
  readonly type: TApi;
  readonly environment: TEnvironment;
};
