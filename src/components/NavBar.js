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
  Button,
  Box
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import BookIcon from '@mui/icons-material/Book';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ThemeToggle from './ThemeToggle';
import { useAuth } from './firebase/AuthContext';

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);

  const handleLogout = () => {
    navigate('/logout');
  };

  const menuItems = [
    { text: 'Заклинания', icon: <BookIcon />, path: '/spells', auth: true },
    { text: 'Бестиарий', icon: <Diversity3Icon />, path: '/bestiary', auth: true },
    { text: 'Закладки', icon: <BookmarkIcon />, path: '/bookmarks', auth: true },
    { text: 'Лист персонажа', icon: <PersonIcon />, path: '/character-sheet', auth: true },
  ];

  const filteredMenuItems = menuItems.filter(item => !item.auth || currentUser);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
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

          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            Бардовский университет v2.0
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {filteredMenuItems.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  component={Link}
                  to={item.path}
                  startIcon={item.icon}
                  sx={{ ml: 1 }}
                >
                  {item.text}
                </Button>
              ))}
              {currentUser && (
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  startIcon={<ExitToAppIcon />}
                  sx={{ ml: 1 }}
                >
                  Выйти
                </Button>
              )}
            </Box>
          )}

          <ThemeToggle />
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerClose}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            width: 250,
          },
        }}
      >
        <List>
          {filteredMenuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              onClick={handleDrawerClose}
              sx={{ color: 'inherit' }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          {currentUser && (
            <ListItem
              button
              onClick={() => {
                handleLogout();
                handleDrawerClose();
              }}
              sx={{ color: 'inherit' }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Выйти" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default NavBar;