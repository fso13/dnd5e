import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'; // Импортируем BrowserRouter
import App from './App'; // Основной компонент приложения
import { ThemeProvider } from './theme'; // Провайдер темы (если используется)
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';

// Основной рендер приложения
ReactDOM.render(
  <React.StrictMode>
    {/* Используем BrowserRouter с basename */}
    <HashRouter hashType="noslash" >
      {/* Провайдер темы (если используется) */}
      <ThemeProvider>
        <CssBaseline />
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root') // Рендерим в элемент с id="root"
);