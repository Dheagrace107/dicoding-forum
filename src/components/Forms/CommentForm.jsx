import { useState } from 'react';
import PropTypes from 'prop-types';

export default function CommentForm({ onSubmit }) {
  const [content, setContent] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(content);
    setContent('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Tulis Komentar</h3>
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        required
      />
      <button type="submit">Kirim</button>
    </form>
  );
}

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
