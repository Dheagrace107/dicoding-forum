import { useState } from 'react';
import PropTypes from 'prop-types';

export default function ThreadForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({ title, category, body });
    setTitle('');
    setCategory('');
    setBody('');
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Buat Thread Baru</h2>

      <div className="form-group">
        <label htmlFor="title">Judul</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Kategori</label>
        <input
          id="category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="body">Konten</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </div>

      <button type="submit">Posting</button>
    </form>
  );
}

ThreadForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
