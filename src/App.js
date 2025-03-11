import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookmarkDetailPage from './pages/BookmarkDetailPage';
import BookmarksPage from './pages/BookmarksPage';
import SpellDetailPage from './pages/SpellDetailPage';
import NavBar from './components/NavBar';
import BestiaryPage from './pages/BestiaryPage';
import MonsterDetailPage from './pages/MonsterDetailPage';

function App() {
  const [spells, setSpells] = useState([]); // Состояние для заклинаний
  const [monsters, setMonsters] = useState([]); // Состояние для монстров
  const [isLoading, setIsLoading] = useState(true); // Состояние для загрузки

  // Ключи для localStorage
  const SPELLS_KEY = 'cached_spells';
  const MONSTERS_KEY = 'cached_monsters';

  // Загрузка данных из JSON-файлов или кэша
  useEffect(() => {
      const fetchData = async () => {
          try {
              // Проверяем, есть ли данные в кэше
              const cachedSpells = localStorage.getItem(SPELLS_KEY);
              const cachedMonsters = localStorage.getItem(MONSTERS_KEY);

              if (cachedSpells && cachedMonsters) {
                  // Если данные есть в кэше, используем их
                  setSpells(JSON.parse(cachedSpells));
                  setMonsters(JSON.parse(cachedMonsters));
              } else {
                  // Если данных нет в кэше, загружаем их с сервера
                  const spellsResponse = await fetch(`${process.env.PUBLIC_URL}/data/spells.json`);
                  const spellsData = await spellsResponse.json();
                  setSpells(spellsData);
                  localStorage.setItem(SPELLS_KEY, JSON.stringify(spellsData)); // Кэшируем заклинания

                  const monstersResponse = await fetch(`${process.env.PUBLIC_URL}/data/monsters.json`);
                  const monstersData = await monstersResponse.json();
                  setMonsters(monstersData);
                  localStorage.setItem(MONSTERS_KEY, JSON.stringify(monstersData)); // Кэшируем монстров
              }

              setIsLoading(false); // Загрузка завершена
          } catch (error) {
              console.error('Ошибка при загрузке данных:', error);
              setIsLoading(false); // Загрузка завершена с ошибкой
          }
      };

      fetchData();
  }, []);

  // Отображение загрузки
  if (isLoading) {
      return <div>Загрузка...</div>;
  }

  return (
    <div><NavBar />
      <Routes>
        <Route path="/" element={<HomePage spells={spells} />} />
        <Route path="/spells" element={<HomePage spells={spells} />} />
        <Route path="/spells/:spellName" element={<SpellDetailPage spells={spells} />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="/bookmarks/:bookmarkId" element={<BookmarkDetailPage />} />
        <Route path="/bestiary" element={<BestiaryPage monsters={monsters} />} />
        <Route path="/bestiary/:monsterName" element={<MonsterDetailPage monsters={monsters} />} />
      </Routes></div>
  );
}

export default App;