import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncUnsetAuthUser } from '../../states/authUser/thunks';

export default function Navbar({ authUser }) {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(asyncUnsetAuthUser());
  }

  return (
    <nav
      style={{
        padding: '1rem',
        borderBottom: '1px solid #ddd',
        marginBottom: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <Link to="/">Threads</Link>
        {' | '}
        <Link to="/leaderboards">Leaderboard</Link>
      </div>
      <div>
        {authUser ? (
          <>
            <span style={{ marginRight: '0.5rem' }}>{authUser.name}</span>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            {' | '}
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  authUser: PropTypes.shape({
    name: PropTypes.string,
  }),
};

Navbar.defaultProps = {
  authUser: null,
};
