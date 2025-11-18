import { useState } from 'react';
import PropTypes from 'prop-types';

export default function RegisterForm({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onSubmit(event) {
    event.preventDefault();
    onRegister({ name, email, password });
  }

  return (
    <form onSubmit={onSubmit} className="form-container">
      <h2>Register</h2>

      <label htmlFor="name" className="form-group">
        Nama
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </label>

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

      <button type="submit">Daftar</button>
    </form>
  );
}

RegisterForm.propTypes = {
  onRegister: PropTypes.func.isRequired,
};
