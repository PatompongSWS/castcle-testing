import { sharedDataAccessInterfaceJwt } from './shared-data-access-interface-jwt';

describe('sharedDataAccessInterfaceJwt', () => {
  it('should work', () => {
    expect(sharedDataAccessInterfaceJwt()).toEqual(
      'shared-data-access-interface-jwt'
    );
  });
});
