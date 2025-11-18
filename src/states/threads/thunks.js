import api from '../../api';
import {
  receiveThreads,
  addThread,
  toggleUpVoteThread,
  toggleDownVoteThread,
} from './slice';
import { receiveUsers } from '../users/slice';
import { showLoading, hideLoading } from '../loading/slice';

export function asyncGetThreads() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      // Ambil threads & semua user
      const [threads, users] = await Promise.all([
        api.getThreads(),
        api.getAllUsers(),
      ]);

      // Store user ke Redux
      dispatch(receiveUsers(users));

      // Gabungkan owner ke setiap thread
      const threadsWithOwner = threads.map((thread) => ({
        ...thread,
        owner: users.find((u) => u.id === thread.ownerId) || null,
      }));

      // Kirim threads hasil join ke Redux
      dispatch(receiveThreads(threadsWithOwner));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

export function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const thread = await api.createThread({ title, body, category });

      // Ambil semua user untuk join owner
      const users = await api.getAllUsers();
      const threadWithOwner = {
        ...thread,
        owner: users.find((u) => u.id === thread.ownerId),
      };

      dispatch(addThread(threadWithOwner));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

export function asyncUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    dispatch(toggleUpVoteThread({ threadId, userId: authUser.id }));

    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      dispatch(toggleUpVoteThread({ threadId, userId: authUser.id }));
      alert(error.message);
    }
  };
}

export function asyncDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    dispatch(toggleDownVoteThread({ threadId, userId: authUser.id }));

    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      dispatch(toggleDownVoteThread({ threadId, userId: authUser.id }));
      alert(error.message);
    }
  };
}
