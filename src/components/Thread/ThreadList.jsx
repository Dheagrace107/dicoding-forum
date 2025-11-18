import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';

export default function ThreadList({ threads }) {
  if (threads.length === 0) {
    return <p>Belum ada thread.</p>;
  }

  return (
    <div>
      {threads.map((thread) => (
        <ThreadItem key={thread.id} thread={thread} />
      ))}
    </div>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.object).isRequired,
};
