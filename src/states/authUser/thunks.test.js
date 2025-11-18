/**
 * SKENARIO TEST
 *
 * asyncSetAuthUser thunk
 * 1. Ketika login sukses:
 *    - memanggil showLoading
 *    - memanggil api.login
 *    - memanggil api.getOwnProfile
 *    - dispatch setAuthUser
 *    - memanggil hideLoading
 *
 * 2. Ketika login gagal:
 *    - memanggil showLoading
 *    - api.login throw error
 *    - menampilkan alert
 *    - tetap memanggil hideLoading
 */

import { vi } from 'vitest';
import { asyncSetAuthUser } from './thunks';
import { setAuthUser } from './slice';
import { showLoading, hideLoading } from '../loading/slice';
import api from '../../api';

describe('asyncSetAuthUser thunk', () => {
  it('should dispatch actions correctly on successful login', async () => {
    // mock API
    api.login = vi.fn(() => Promise.resolve('token-123'));
    api.putAccessToken = vi.fn();
    api.getOwnProfile = vi.fn(() =>
      Promise.resolve({ id: 'user-1', name: 'Dicoding' })
    );

    const dispatch = vi.fn();

    await asyncSetAuthUser({ email: 'test', password: '123' })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.login).toHaveBeenCalled();
    expect(api.getOwnProfile).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(
      setAuthUser({ id: 'user-1', name: 'Dicoding' })
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should show alert when login fails', async () => {
    api.login = vi.fn(() => Promise.reject(new Error('Login gagal')));
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    const dispatch = vi.fn();

    await asyncSetAuthUser({ email: 'x', password: 'y' })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(alertMock).toHaveBeenCalledWith('Login gagal');
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
