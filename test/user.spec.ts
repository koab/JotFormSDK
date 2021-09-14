import createSDK from '../src/index';
import UserModule from '../src/modules/user';

describe('User Module', () => {
  it('should have functioning getUserInfo', async () => {
    const sdkInstance = createSDK({
      type: 'PUBLIC',
      environment: 'TESTING'
    });

    sdkInstance.registerModule(UserModule);

    const userInfo = await sdkInstance.user.getUserInfo();
    console.log({ userInfo });
  })
});
