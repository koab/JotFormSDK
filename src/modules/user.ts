import { TModule, TNetworkManager } from '../constants/type';

const UserModule: TModule = {
  name: 'user',
  functionList: {
    getUserInfo: (networkManager: TNetworkManager) => () => networkManager.get('/user')
  }
}

export default UserModule;
