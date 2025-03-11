import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom'; // Добавляем Link для маршрутизации
import MenuIcon from '@mui/icons-material/Menu';
import GamesIcon from '@mui/icons-material/SportsEsports';
import PostsIcon from '@mui/icons-material/Article';
import ThemeToggle from './ThemeToggle'; // Компонент для переключения темы

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  // Пункты меню
  const menuItems = [
    { text: 'Заклинания', icon: <GamesIcon />, path: '/spells' },
    { text: 'Закладки', icon: <PostsIcon />, path: '/bookmarks' },
    { text: 'Бестиарий', icon: <PostsIcon />, path: '/bestiary' },
  ];

  return (
    <>
      {/* Верхняя панель */}
      <AppBar position="static">
        <Toolbar>
          {/* Иконка меню для мобильной версии */}
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          {/* Иконка приложения и название сайта */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={event =>  window.location.href='/'}>
            Бардовский университет v2.0
          </Typography>
          {/* Пункты меню для десктопной версии */}
          {!isMobile && (
            <div style={{ display: 'flex' }}>
              {menuItems.map((item) => (
                <IconButton
                  key={item.text}
                  color="inherit"
                  aria-label={item.text}
                  component={Link} // Используем Link для маршрутизации
                  to={item.path}
                  sx={{ ml: 1 }}
                >
                  {item.icon}
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    {item.text}
                  </Typography>
                </IconButton>
              ))}
            </div>
          )}
          {/* Переключатель темы */}
          <ThemeToggle />
        </Toolbar>
      </AppBar>

      {/* Боковая панель для мобильной версии */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerClose}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: theme.palette.background.default, // Фон боковой панели
            color: theme.palette.text.primary, // Цвет текста
          },
        }}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              onClick={handleDrawerClose}
              sx={{ color: 'inherit' }} // Наследуем цвет текста
            >
              <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default NavBar;