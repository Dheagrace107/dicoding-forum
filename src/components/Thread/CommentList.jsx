import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

export default function CommentList({ comments }) {
  if (!comments.length) {
    return <p>Belum ada komentar.</p>;
  }

  return (
    <div>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};
