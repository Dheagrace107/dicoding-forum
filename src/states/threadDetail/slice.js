import { createSlice } from '@reduxjs/toolkit';

const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState: null,
  reducers: {
    receiveThreadDetail: (_, action) => action.payload,

    clearThreadDetail: () => null,

    addComment: (state, action) => {
      state.comments.push(action.payload);
    },

    toggleUpVoteDetail: (state, action) => {
      const { userId } = action.payload;

      state.downVotesBy = state.downVotesBy.filter((id) => id !== userId);

      if (state.upVotesBy.includes(userId)) {
        state.upVotesBy = state.upVotesBy.filter((id) => id !== userId);
      } else {
        state.upVotesBy.push(userId);
      }
    },

    toggleDownVoteDetail: (state, action) => {
      const { userId } = action.payload;

      state.upVotesBy = state.upVotesBy.filter((id) => id !== userId);

      if (state.downVotesBy.includes(userId)) {
        state.downVotesBy = state.downVotesBy.filter((id) => id !== userId);
      } else {
        state.downVotesBy.push(userId);
      }
    },

    toggleUpVoteComment: (state, action) => {
      const { commentId, userId } = action.payload;
      const comment = state.comments.find((c) => c.id === commentId);
      if (!comment) return;

      comment.downVotesBy = comment.downVotesBy.filter((id) => id !== userId);

      if (comment.upVotesBy.includes(userId)) {
        comment.upVotesBy = comment.upVotesBy.filter((id) => id !== userId);
      } else {
        comment.upVotesBy.push(userId);
      }
    },

    toggleDownVoteComment: (state, action) => {
      const { commentId, userId } = action.payload;
      const comment = state.comments.find((c) => c.id === commentId);
      if (!comment) return;

      comment.upVotesBy = comment.upVotesBy.filter((id) => id !== userId);

      if (comment.downVotesBy.includes(userId)) {
        comment.downVotesBy = comment.downVotesBy.filter((id) => id !== userId);
      } else {
        comment.downVotesBy.push(userId);
      }
    },
  },
});

export const {
  receiveThreadDetail,
  clearThreadDetail,
  toggleUpVoteDetail,
  toggleDownVoteDetail,
  toggleUpVoteComment,
  toggleDownVoteComment,
} = threadDetailSlice.actions;

export default threadDetailSlice.reducer;
