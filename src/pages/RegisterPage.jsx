import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import RegisterForm from '../components/Forms/RegisterForm';
import { asyncRegisterUser } from '../states/authUser/thunks';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.loading); // GLOBAL LOADING

  async function handleRegister({ name, email, password }) {
    await dispatch(
      asyncRegisterUser({
        name,
        email,
        password,
        onSuccess: () => navigate('/login'),
      })
    );
  }

  if (loading) {
    return <p>Memproses pendaftaran...</p>;
  }

  return (
    <div>
      <RegisterForm onRegister={handleRegister} />
      <p>
        Sudah punya akun? <Link to="/login">Login di sini</Link>
      </p>
    </div>
  );
}
