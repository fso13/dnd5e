import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import React, { createContext, useState } from 'react';

// Создаем контекст для темы
const ThemeContext = createContext();

// Функция для создания темы
const getTheme = (darkMode) =>
  createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

// Провайдер темы
export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true); // По умолчанию темная тема

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <MuiThemeProvider theme={getTheme(darkMode)}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContext };