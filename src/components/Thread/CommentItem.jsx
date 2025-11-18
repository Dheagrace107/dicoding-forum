import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncUpVoteComment,
  asyncDownVoteComment,
} from '../../states/threadDetail/thunks';

export default function CommentItem({ comment }) {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);
  const threadDetail = useSelector((state) => state.threadDetail);

  const isUp = authUser && comment.upVotesBy.includes(authUser.id);
  const isDown = authUser && comment.downVotesBy.includes(authUser.id);

  function handleUp() {
    if (!authUser) {
      return alert('Login dulu untuk vote');
    }
    return dispatch(asyncUpVoteComment(threadDetail.id, comment.id));
  }

  function handleDown() {
    if (!authUser) {
      return alert('Login dulu untuk vote');
    }
    return dispatch(asyncDownVoteComment(threadDetail.id, comment.id));
  }

  return (
    <div
      style={{
        borderBottom: '1px solid #eee',
        padding: '0.75rem 0',
      }}
    >
      {/* Informasi Pembuat Komentar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '0.5rem',
        }}
      >
        <img
          src={comment.owner.avatar}
          alt={comment.owner.name}
          style={{ width: 32, height: 32, borderRadius: '50%' }}
        />
        <strong>{comment.owner.name}</strong>
      </div>

      {/* Isi Komentar */}
      <p style={{ marginBottom: '0.25rem' }}>{comment.content}</p>

      {/* Waktu komentar */}
      <small style={{ color: '#777' }}>
        {new Date(comment.createdAt).toLocaleString()}
      </small>

      {/* Vote */}
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
        <button
          type="button"
          onClick={handleUp}
          style={{ color: isUp ? 'blue' : '#444' }}
        >
          👍 {comment.upVotesBy.length}
        </button>

        <button
          type="button"
          onClick={handleDown}
          style={{ color: isDown ? 'red' : '#444' }}
        >
          👎 {comment.downVotesBy.length}
        </button>
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      avatar: PropTypes.string,
    }).isRequired,
    createdAt: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
