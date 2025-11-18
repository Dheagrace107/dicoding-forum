import api from '../../api';
import { setAuthUser, unsetAuthUser } from './slice';
import { showLoading, hideLoading } from '../loading/slice';

// LOGIN
export function asyncSetAuthUser({ email, password, onSuccess }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const token = await api.login({ email, password });
      api.putAccessToken(token);

      const authUser = await api.getOwnProfile();
      dispatch(setAuthUser(authUser));

      if (onSuccess) onSuccess();
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

// LOGOUT
export function asyncUnsetAuthUser() {
  return (dispatch) => {
    api.putAccessToken('');
    dispatch(unsetAuthUser());
  };
}

// REGISTER
export function asyncRegisterUser({ name, email, password, onSuccess }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.register({ name, email, password });
      alert('Registrasi sukses! Silakan login.');
      if (onSuccess) onSuccess();
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}
