import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode } from '../store/slices/themeSlice';

export function ThemeProvider({ children }) {
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [darkMode]);

  return children;
}

export const useTheme = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const toggleDarkMode = () => {
    const nextMode = !darkMode;
    localStorage.setItem('darkMode', String(nextMode));
    dispatch(setDarkMode(nextMode));
  };

  return { darkMode, toggleDarkMode };
};
