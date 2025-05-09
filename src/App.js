import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box
} from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { AuthProvider, useAuth } from './components/firebase/AuthContext';
import PrivateRoute from './components/firebase/PrivateRoute';
import Layout from './Layout';
import HomePage from './pages/spells/HomePage';
import BestiaryPage from './pages/monsters/BestiaryPage';
import SpellDetailPage from './pages/spells/SpellDetailPage';
import MonsterDetailPage from './pages/monsters/MonsterDetailPage';
import BookmarksPage from './pages/bookmarks/BookmarksPage';
import BookmarkDetailPage from './pages/bookmarks/BookmarkDetailPage';
import CharacterSheetPage from './pages/character/CharacterSheetPage';
import CharacterManager from './pages/character/CharacterManager';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import LogoutPage from './pages/auth/LogoutPage';
import {
  getBookmarks,
  addBookmark as addBookmarkToFirestore,
  updateBookmark,
  deleteBookmark
} from './components/bookmark/bookmarksService';

function AppContent() {
  const [bookmarks, setBookmarks] = useState([]);
  const [spells, setSpells] = useState([]);
  const [monsters, setMonsters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const { currentUser, loading: authLoading } = useAuth();

  const SPELLS_KEY = 'cached_spells';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [spellsResponse, monstersResponse] = await Promise.all([
          fetch(`${process.env.PUBLIC_URL}/data/spells-new.json`),
          fetch(`${process.env.PUBLIC_URL}/data/monsters-new.json`)
        ]);

        const [spellsData, monstersData] = await Promise.all([
          spellsResponse.json(),
          monstersResponse.json()
        ]);

        const sortedSpells = spellsData.sort((a, b) => {
          if (a.level !== b.level) return a.level - b.level;
          return a.name.rus.localeCompare(b.name.rus);
        });

        const sortedMonsters = monstersData.sort((a, b) =>
          a.name.rus.localeCompare(b.name.rus)
        );

        setSpells(sortedSpells);
        setMonsters(sortedMonsters);
        localStorage.setItem(SPELLS_KEY, JSON.stringify(sortedSpells));

        if (currentUser) {
          const userBookmarks = await getBookmarks(currentUser.uid);
          setBookmarks(userBookmarks);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        setIsLoading(false);
        enqueueSnackbar('Ошибка загрузки данных', { variant: 'error' });
      }
    };

    if (!authLoading) {
      fetchData();
    }
  }, [currentUser, authLoading, enqueueSnackbar]);

  const bookmarkActions = {
    addBookmark: async (name) => {
      try {
        if (!currentUser) {
          throw new Error('Для создания закладки необходимо войти в систему');
        }

        const newBookmark = {
          name,
          spells: [],
          monsters: [],
        };
        const createdBookmark = await addBookmarkToFirestore(currentUser.uid, newBookmark);
        setBookmarks([...bookmarks, createdBookmark]);
        enqueueSnackbar(`Закладка "${name}" создана`, { variant: 'success' });
        return createdBookmark;
      } catch (error) {
        console.error('Error adding bookmark:', error);
        enqueueSnackbar(error.message, { variant: 'error' });
        throw error;
      }
    },

    addSpellToBookmark: async (bookmarkId, spell) => {
      try {
        const bookmark = bookmarks.find(b => b.id === bookmarkId);
        if (!bookmark) throw new Error('Закладка не найдена');

        const updatedBookmark = {
          ...bookmark,
          spells: [...bookmark.spells, spell]
        };

        await updateBookmark(bookmarkId, { spells: updatedBookmark.spells });
        setBookmarks(bookmarks.map(b => b.id === bookmarkId ? updatedBookmark : b));
        enqueueSnackbar(`Заклинание "${spell.name.rus}" добавлено`, { variant: 'success' });
      } catch (error) {
        console.error('Error adding spell:', error);
        enqueueSnackbar(error.message, { variant: 'error' });
        throw error;
      }
    },

    addMonsterToBookmark: async (bookmarkId, monster) => {
      try {
        const bookmark = bookmarks.find(b => b.id === bookmarkId);
        if (!bookmark) throw new Error('Закладка не найдена');

        const updatedBookmark = {
          ...bookmark,
          monsters: [...bookmark.monsters, monster]
        };

        await updateBookmark(bookmarkId, { monsters: updatedBookmark.monsters });
        setBookmarks(bookmarks.map(b => b.id === bookmarkId ? updatedBookmark : b));
        enqueueSnackbar(`Монстр "${monster.name.rus}" добавлен`, { variant: 'success' });
      } catch (error) {
        console.error('Error adding monster:', error);
        enqueueSnackbar(error.message, { variant: 'error' });
        throw error;
      }
    },

    removeSpellFromBookmark: async (bookmarkId, spellId) => {
      try {
        const bookmark = bookmarks.find(b => b.id === bookmarkId);
        if (!bookmark) throw new Error('Закладка не найдена');

        const updatedBookmark = {
          ...bookmark,
          spells: bookmark.spells.filter(spell => spell.name.rus !== spellId)
        };

        await updateBookmark(bookmarkId, { spells: updatedBookmark.spells });
        setBookmarks(bookmarks.map(b => b.id === bookmarkId ? updatedBookmark : b));
        enqueueSnackbar(`Заклинание удалено`, { variant: 'error' });
      } catch (error) {
        console.error('Error removing spell:', error);
        enqueueSnackbar(error.message, { variant: 'error' });
        throw error;
      }
    },

    removeMonsterFromBookmark: async (bookmarkId, monsterId) => {
      try {
        const bookmark = bookmarks.find(b => b.id === bookmarkId);
        if (!bookmark) throw new Error('Закладка не найдена');

        const updatedBookmark = {
          ...bookmark,
          monsters: bookmark.monsters.filter(monster => monster.name.rus !== monsterId)
        };

        await updateBookmark(bookmarkId, { monsters: updatedBookmark.monsters });
        setBookmarks(bookmarks.map(b => b.id === bookmarkId ? updatedBookmark : b));
        enqueueSnackbar(`Монстр удален`, { variant: 'error' });
      } catch (error) {
        console.error('Error removing monster:', error);
        enqueueSnackbar(error.message, { variant: 'error' });
        throw error;
      }
    },

    removeBookmark: async (bookmarkId) => {
      try {
        await deleteBookmark(bookmarkId);
        setBookmarks(bookmarks.filter(bookmark => bookmark.id !== bookmarkId));
        enqueueSnackbar(`Закладка удалена`, { variant: 'error' });
      } catch (error) {
        console.error('Error deleting bookmark:', error);
        enqueueSnackbar(error.message, { variant: 'error' });
        throw error;
      }
    },

    renameBookmark: async (bookmarkId, newName) => {
      try {
        await updateBookmark(bookmarkId, { name: newName });
        setBookmarks(bookmarks.map(bookmark =>
          bookmark.id === bookmarkId
            ? { ...bookmark, name: newName }
            : bookmark
        ));
        enqueueSnackbar(`Закладка переименована`, { variant: 'warning' });
      } catch (error) {
        console.error('Error renaming bookmark:', error);
        enqueueSnackbar(error.message, { variant: 'error' });
        throw error;
      }
    }
  };

  if (isLoading || authLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6">Загрузка...</Typography>
      </Box>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/logout" element={<LogoutPage />} />

      <Route path="/" element={<PrivateRoute />}>
        <Route index element={<HomePage spells={spells} bookmarks={bookmarks} {...bookmarkActions} />} />
        <Route path="character-sheet" element={<CharacterManager />} />
        <Route path="character-sheet/:id" element={<CharacterSheetPage />} />
        <Route path="spells" element={<HomePage spells={spells} bookmarks={bookmarks} {...bookmarkActions} />} />
        <Route path="spells/:spellName" element={<SpellDetailPage spells={spells} bookmarks={bookmarks} {...bookmarkActions} />} />
        <Route path="bestiary" element={<BestiaryPage monsters={monsters} bookmarks={bookmarks} {...bookmarkActions} />} />
        <Route path="bestiary/:monsterName" element={<MonsterDetailPage monsters={monsters} bookmarks={bookmarks} {...bookmarkActions} />} />
        <Route path="bookmarks" element={<BookmarksPage bookmarks={bookmarks} {...bookmarkActions} />} />
        <Route path="bookmarks/:bookmarkId" element={<BookmarkDetailPage bookmarks={bookmarks} {...bookmarkActions} />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Layout>
        <AppContent />
      </Layout>
    </AuthProvider>
  );
}

export default App;