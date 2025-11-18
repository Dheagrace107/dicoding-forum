/* eslint no-underscore-dangle: ["error", { "allow": ["_fetchWithAuth"] }] */

const BASE_URL = 'https://forum-api.dicoding.dev/v1';

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function putAccessToken(token) {
  localStorage.setItem('accessToken', token);
}

async function _fetchWithAuth(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

async function login({ email, password }) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const json = await response.json();
  if (json.status !== 'success') throw new Error(json.message);
  return json.data.token;
}

async function register({ name, email, password }) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  const json = await response.json();
  if (json.status !== 'success') throw new Error(json.message);
  return json.data.user;
}

async function getOwnProfile() {
  const response = await _fetchWithAuth(`${BASE_URL}/users/me`);
  const json = await response.json();
  if (json.status !== 'success') throw new Error(json.message);
  return json.data.user;
}

async function getAllUsers() {
  const response = await fetch(`${BASE_URL}/users`);
  const json = await response.json();
  if (json.status !== 'success') throw new Error(json.message);
  return json.data.users;
}

async function getThreads() {
  const response = await fetch(`${BASE_URL}/threads`);
  const json = await response.json();
  if (json.status !== 'success') throw new Error(json.message);
  return json.data.threads;
}

async function createThread({ title, body, category }) {
  const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, body, category }),
  });

  const json = await response.json();
  if (json.status !== 'success') throw new Error(json.message);
  return json.data.thread;
}

async function getThreadDetail(id) {
  const response = await fetch(`${BASE_URL}/threads/${id}`);
  const json = await response.json();
  if (json.status !== 'success') throw new Error(json.message);
  return json.data.detailThread;
}

async function createComment({ threadId, content }) {
  const response = await _fetchWithAuth(
    `${BASE_URL}/threads/${threadId}/comments`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    }
  );

  const json = await response.json();
  if (json.status !== 'success') throw new Error(json.message);
  return json.data.comment;
}

async function getLeaderboards() {
  const response = await fetch(`${BASE_URL}/leaderboards`);
  const json = await response.json();
  if (json.status !== 'success') throw new Error(json.message);
  return json.data.leaderboards;
}

async function upVoteThread(threadId) {
  const response = await _fetchWithAuth(
    `${BASE_URL}/threads/${threadId}/up-vote`,
    { method: 'POST' }
  );
  const json = await response.json();
  if (json.status !== 'success') throw new Error(json.message);
  return json.data.vote;
}

async function downVoteThread(threadId) {
  const response = await _fetchWithAuth(
    `${BASE_URL}/threads/${threadId}/down-vote`,
    { method: 'POST' }
  );
  const json = await response.json();
  if (json.status !== 'success') throw new Error(json.message);
  return json.data.vote;
}

async function neutralVoteThread(threadId) {
  const response = await _fetchWithAuth(
    `${BASE_URL}/threads/${threadId}/neutral-vote`,
    { method: 'POST' }
  );
  const json = await response.json();
  if (json.status !== 'success') throw new Error(json.message);
  return json.data.vote;
}

async function upVoteComment(threadId, commentId) {
  const response = await _fetchWithAuth(
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
    { method: 'POST' }
  );
  const json = await response.json();
  if (json.status !== 'success') throw new Error(json.message);
  return json.data.vote;
}

async function downVoteComment(threadId, commentId) {
  const response = await _fetchWithAuth(
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
    { method: 'POST' }
  );
  const json = await response.json();
  if (json.status !== 'success') throw new Error(json.message);
  return json.data.vote;
}

async function neutralVoteComment(threadId, commentId) {
  const response = await _fetchWithAuth(
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
    { method: 'POST' }
  );
  const json = await response.json();
  if (json.status !== 'success') throw new Error(json.message);
  return json.data.vote;
}

export default {
  login,
  register,
  getOwnProfile,
  putAccessToken,
  getAccessToken,
  getAllUsers,
  getThreads,
  getThreadDetail,
  createThread,
  createComment,
  getLeaderboards,
  upVoteThread,
  downVoteThread,
  neutralVoteThread,
  upVoteComment,
  downVoteComment,
  neutralVoteComment,
};
