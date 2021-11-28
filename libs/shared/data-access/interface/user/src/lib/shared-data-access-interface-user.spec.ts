import { sharedDataAccessInterfaceUser } from './shared-data-access-interface-user';

describe('sharedDataAccessInterfaceUser', () => {
  it('should work', () => {
    expect(sharedDataAccessInterfaceUser()).toEqual(
      'shared-data-access-interface-user'
    );
  });
});
