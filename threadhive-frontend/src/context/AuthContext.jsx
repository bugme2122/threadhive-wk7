import { useDispatch, useSelector } from 'react-redux';
import { clearAuth, setAuth, setUser } from '../store/slices/authSlice';

export function AuthProvider({ children }) {
  return children;
}

export const useAuth = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  const loginUser = (data) => {
    if (data.token) {
      localStorage.setItem('token', data.token);
    }

    if (data.user) {
      localStorage.setItem('user', JSON.stringify(data.user));
    }

    dispatch(
      setAuth({
        token: data.token ?? token,
        user: data.user ?? user,
      }),
    );
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(clearAuth());
  };

  const updateUser = (updatedUser) => {
    localStorage.setItem('user', JSON.stringify(updatedUser));
    dispatch(setUser(updatedUser));
  };

  return { token, user, loginUser, logout, updateUser };
};
