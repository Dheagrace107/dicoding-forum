import api from '../../api';
import {
  receiveThreadDetail,
  clearThreadDetail,
  toggleUpVoteDetail,
  toggleDownVoteDetail,
  toggleUpVoteComment,
  toggleDownVoteComment,
} from './slice';

import { showLoading, hideLoading } from '../loading/slice';

// === FIXED ===
// Nama fungsi diganti agar sesuai dengan yang di-import di ThreadDetailPage.jsx
export function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetail());

    try {
      const detail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetail(detail));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

export function asyncAddComment(threadId, content) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      await api.createComment({ threadId, content });

      // refresh detail supaya komentar ter-update secara akurat
      const updatedDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetail(updatedDetail));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

export function asyncUpVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    dispatch(toggleUpVoteDetail({ userId: authUser.id }));

    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      dispatch(toggleUpVoteDetail({ userId: authUser.id }));
      alert(error.message);
    }
  };
}

export function asyncDownVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    dispatch(toggleDownVoteDetail({ userId: authUser.id }));

    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      dispatch(toggleDownVoteDetail({ userId: authUser.id }));
      alert(error.message);
    }
  };
}

export function asyncUpVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    dispatch(toggleUpVoteComment({ commentId, userId: authUser.id }));

    try {
      await api.upVoteComment(threadId, commentId);
    } catch (error) {
      dispatch(toggleUpVoteComment({ commentId, userId: authUser.id }));
      alert(error.message);
    }
  };
}

export function asyncDownVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    dispatch(toggleDownVoteComment({ commentId, userId: authUser.id }));

    try {
      await api.downVoteComment(threadId, commentId);
    } catch (error) {
      dispatch(toggleDownVoteComment({ commentId, userId: authUser.id }));
      alert(error.message);
    }
  };
}
