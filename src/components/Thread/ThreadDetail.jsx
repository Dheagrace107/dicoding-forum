import PropTypes from 'prop-types';
import formatDate from '../../utils/date';

export default function ThreadDetail({ thread }) {
  const { title, body, category, createdAt, owner } = thread;

  return (
    <article
      style={{
        border: '1px solid #ddd',
        padding: '1rem',
        marginBottom: '1rem',
      }}
    >
      <p style={{ fontSize: '0.85rem', color: '#555' }}>
        #{category} • {formatDate(createdAt)}
      </p>
      <h1>{title}</h1>
      <p style={{ marginTop: '1rem' }}>{body}</p>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '1rem',
          gap: '0.5rem',
        }}
      >
        {owner.avatar && (
          <img
            src={owner.avatar}
            alt={owner.name}
            style={{ width: 40, height: 40, borderRadius: '50%' }}
          />
        )}
        <span style={{ fontSize: '0.9rem' }}>{owner.name}</span>
      </div>
    </article>
  );
}

ThreadDetail.propTypes = {
  thread: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
