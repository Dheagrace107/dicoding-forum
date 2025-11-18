import { createSlice } from '@reduxjs/toolkit';

const threadsSlice = createSlice({
  name: 'threads',
  initialState: [],
  reducers: {
    receiveThreads: (state, action) => action.payload,

    addThread: (state, action) => [action.payload, ...state],

    toggleUpVoteThread: (state, action) => {
      const { threadId, userId } = action.payload;
      const thread = state.find((t) => t.id === threadId);
      if (!thread) return state;

      thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);

      if (thread.upVotesBy.includes(userId)) {
        thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
      } else {
        thread.upVotesBy.push(userId);
      }

      return state;
    },

    toggleDownVoteThread: (state, action) => {
      const { threadId, userId } = action.payload;
      const thread = state.find((t) => t.id === threadId);
      if (!thread) return state;

      thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);

      if (thread.downVotesBy.includes(userId)) {
        thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);
      } else {
        thread.downVotesBy.push(userId);
      }

      return state;
    },
  },
});

export const {
  receiveThreads,
  addThread,
  toggleUpVoteThread,
  toggleDownVoteThread,
} = threadsSlice.actions;

export default threadsSlice.reducer;
