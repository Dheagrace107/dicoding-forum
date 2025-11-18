import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  asyncUpVoteThread,
  asyncDownVoteThread,
} from '../../states/threads/thunks';

export default function ThreadItem({ thread }) {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);

  const isUp = authUser && thread.upVotesBy.includes(authUser.id);
  const isDown = authUser && thread.downVotesBy.includes(authUser.id);

  function handleUp() {
    if (!authUser) {
      alert('Login dulu untuk vote');
    } else {
      dispatch(asyncUpVoteThread(thread.id));
    }
  }

  function handleDown() {
    if (!authUser) {
      alert('Login dulu untuk vote');
    } else {
      dispatch(asyncDownVoteThread(thread.id));
    }
  }

  return (
    <article
      style={{
        border: '1px solid #ddd',
        padding: '1rem',
        marginBottom: '1rem',
        background: '#fff',
        borderRadius: '10px',
      }}
    >
      {/* Info Owner */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <img
          src={thread.owner?.avatar || '/default-avatar.png'}
          alt={thread.owner?.name || 'Unknown'}
          style={{ width: 36, height: 36, borderRadius: '50%' }}
        />
        <strong>{thread.owner?.name || 'Unknown User'}</strong>
      </div>

      <Link to={`/threads/${thread.id}`} style={{ textDecoration: 'none' }}>
        <h3 style={{ marginTop: '0.75rem' }}>{thread.title}</h3>
      </Link>

      {thread.category && (
        <p style={{ fontSize: '0.85rem', color: '#666' }}>#{thread.category}</p>
      )}

      <p>
        {thread.body.slice(0, 150)}
        {thread.body.length > 150 ? '…' : ''}
      </p>

      <p style={{ fontSize: '0.8rem', color: '#777' }}>
        {new Date(thread.createdAt).toLocaleString()}
      </p>

      <div
        style={{
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'center',
          marginTop: '0.5rem',
        }}
      >
        <button
          type="button"
          onClick={handleUp}
          style={{ color: isUp ? 'blue' : '#444' }}
        >
          👍 {thread.upVotesBy.length}
        </button>

        <button
          type="button"
          onClick={handleDown}
          style={{ color: isDown ? 'red' : '#444' }}
        >
          👎 {thread.downVotesBy.length}
        </button>

        <span style={{ marginLeft: 'auto', fontSize: '0.9rem' }}>
          Komentar: {thread.totalComments}
        </span>
      </div>
    </article>
  );
}

ThreadItem.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    totalComments: PropTypes.number.isRequired,
    owner: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
  }).isRequired,
};
