import api from '../../api';
import { setIsPreload } from './slice';
import { setAuthUser } from '../authUser/slice';

export function asyncPreloadProcess() {
  return async (dispatch) => {
    try {
      const token = api.getAccessToken();
      if (token) {
        const user = await api.getOwnProfile();
        dispatch(setAuthUser(user));
      }
    } catch (error) {
      alert(error.message);
      api.putAccessToken('');
    } finally {
      dispatch(setIsPreload(false));
    }
  };
}
