import { ICoreSDK, TNetworkManager } from './constants/type';

const hasKey = <T extends object>(obj: T, k: keyof any): k is keyof T => k in obj;

export const SDKProxyHandler = {
  get: function(target: ICoreSDK, key: string) {
    switch (true) {
      case hasKey(target, key):
        return target[key as keyof typeof target];
      case hasKey(target.moduleStore, key):
        return target.moduleStore[key];
      default:
        return undefined;
    } 
  }
};

export const NetworkManagerProxyHandler = {
  get: function(target: TNetworkManager, key: string, receiver: ICoreSDK) {
    return function(url: string) {
      const constructedURL = [
        `${receiver.apiURL}/`,
        url,
        receiver.type === 'PUBLIC' && `?apiKey=${receiver.apiKey}`
      ].filter(val => val).join('');

      return target[key as keyof typeof target](constructedURL);
    }
  }
}

export default SDKProxyHandler;
