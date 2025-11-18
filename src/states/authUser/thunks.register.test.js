import { vi } from 'vitest';
import api from '../../api';
import { asyncRegisterUser } from './thunks';
import { showLoading, hideLoading } from '../loading/slice';

describe('asyncRegisterUser thunk', () => {
  it('should call API and dispatch correctly on success', async () => {
    api.register = vi.fn(() => Promise.resolve({}));

    const dispatch = vi.fn();
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    await asyncRegisterUser({
      name: 'User Test',
      email: 'test@mail.com',
      password: '123',
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.register).toHaveBeenCalled();
    expect(alertMock).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should show alert when API fails', async () => {
    api.register = vi.fn(() => Promise.reject(new Error('Gagal')));

    const dispatch = vi.fn();
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    await asyncRegisterUser({
      name: 'User Test',
      email: 'test@mail.com',
      password: '123',
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(alertMock).toHaveBeenCalledWith('Gagal');
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
