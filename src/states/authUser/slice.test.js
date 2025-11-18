/**
 * SKENARIO TEST
 *
 * AuthUser reducer
 * 1. setAuthUser - harus mengisi state dengan user object
 * 2. unsetAuthUser - harus mengembalikan state menjadi null
 */

import authUserReducer, { setAuthUser, unsetAuthUser } from './slice';

describe('authUser reducer test', () => {
  it('should set auth user when setAuthUser is dispatched', () => {
    const initialState = null;

    const user = { id: 'user-1', name: 'Dicoding' };
    const nextState = authUserReducer(initialState, setAuthUser(user));

    expect(nextState).toEqual(user);
  });

  it('should unset auth user when unsetAuthUser is dispatched', () => {
    const initialState = { id: 'user-1' };

    const nextState = authUserReducer(initialState, unsetAuthUser());

    expect(nextState).toBeNull();
  });
});
