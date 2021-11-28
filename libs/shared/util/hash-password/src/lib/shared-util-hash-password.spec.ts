import { sharedUtilHashPassword } from './shared-util-hash-password';

describe('sharedUtilHashPassword', () => {
  it('should work', () => {
    expect(sharedUtilHashPassword()).toEqual('shared-util-hash-password');
  });
});
