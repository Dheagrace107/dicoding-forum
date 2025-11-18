import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/Forms/LoginForm';
import { asyncSetAuthUser } from '../states/authUser/thunks';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.loading); // GLOBAL LOADING

  async function handleLogin({ email, password }) {
    await dispatch(
      asyncSetAuthUser({
        email,
        password,
        onSuccess: () => navigate('/'),
      })
    );
  }

  if (loading) {
    return <p>Sedang login...</p>;
  }

  return <LoginForm onLogin={handleLogin} />;
}
