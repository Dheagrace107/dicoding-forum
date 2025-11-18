import api from '../../api';
import { receiveUsers } from './slice';

export function asyncGetLeaderboards() {
  return async (dispatch) => {
    try {
      const response = await api.getLeaderboards();
      dispatch(receiveUsers(response));
    } catch (error) {
      alert(error.message);
    }
  };
}
