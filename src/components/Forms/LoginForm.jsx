import { useState } from 'react';
import PropTypes from 'prop-types';

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onSubmit(event) {
    event.preventDefault();
    onLogin({ email, password });
  }

  return (
    <form onSubmit={onSubmit} className="form-container">
      <h2>Login</h2>

      <label htmlFor="email" className="form-group">
        Email
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </label>

      <label htmlFor="password" className="form-group">
        Password
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </label>

      <button type="submit">Masuk</button>
    </form>
  );
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
