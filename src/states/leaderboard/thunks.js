import api from '../../api';
import { receiveLeaderboards } from './slice';
import { showLoading, hideLoading } from '../loading/slice';

export function asyncGetLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const leaderboards = await api.getLeaderboards();

      dispatch(receiveLeaderboards(leaderboards));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}
