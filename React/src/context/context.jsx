import { createContext, useEffect, useState } from "react";


export const GlobalContext = createContext({
  toggleTheme: () => { },
  token: null,
  user: null,
  theme: 'light',
  setUser: () => { },
  setToken: () => { },

});

export default function GlobalState({ children }) {
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  // const [token, _setToken] = useState();
  const [token, _setToken] = useState(() => localStorage.getItem('ACCESS_TOKEN') || null);
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const toggleTheme = () => {
    setTheme(t => (t === 'light' ? 'dark' : 'light'));
  };
  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  };
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <GlobalContext.Provider value={{ theme, toggleTheme, user, token, loading, setLoading, setUser, setToken, setErrors, errors, setMessage, message }}>
      {children}
    </GlobalContext.Provider>
  );
}