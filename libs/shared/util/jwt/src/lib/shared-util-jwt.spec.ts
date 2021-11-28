import { sharedUtilJwt } from './shared-util-jwt';

describe('sharedUtilJwt', () => {
  it('should work', () => {
    expect(sharedUtilJwt()).toEqual('shared-util-jwt');
  });
});
