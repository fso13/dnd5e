import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/spells/HomePage';
import BestiaryPage from './pages/monsters/BestiaryPage';
import SpellDetailPage from './pages/spells/SpellDetailPage';
import MonsterDetailPage from './pages/monsters/MonsterDetailPage';
import BookmarksPage from './pages/bookmarks/BookmarksPage';
import BookmarkDetailPage from './pages/bookmarks/BookmarkDetailPage';
import NavBar from './components/NavBar';

function App() {
    const [bookmarks, setBookmarks] = useState([]); // Состояние для закладок
    const [spells, setSpells] = useState([]); // Состояние для заклинаний
    const [monsters, setMonsters] = useState([]); // Состояние для монстров
    const [isLoading, setIsLoading] = useState(true); // Состояние для загрузки

    // Ключи для localStorage
    const SPELLS_KEY = 'cached_spells';
    const MONSTERS_KEY = 'cached_monsters';
    const BOOKMARKS_KEY = 'bookmarks';

    // Загрузка данных
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Проверяем, есть ли данные в кэше
                const cachedSpells = localStorage.getItem(SPELLS_KEY);
                const cachedMonsters = localStorage.getItem(MONSTERS_KEY);
                const cachedBookmarks = localStorage.getItem(BOOKMARKS_KEY);

                if (cachedSpells && cachedMonsters) {
                    // Используем кэшированные данные
                    setSpells(JSON.parse(cachedSpells));
                    setMonsters(JSON.parse(cachedMonsters));
                } else {

                    // Загружаем данные с сервера
                    const spellsResponse = await fetch(`${process.env.PUBLIC_URL}/data/spells.json`);
                    const spellsData = await spellsResponse.json();

                    // Сортировка заклинаний по алфавиту и уровню
                    const sortedSpells = spellsData.sort((a, b) => {
                        // Сначала сортируем по уровню
                        if (a.level !== b.level) {
                            return a.level.localeCompare(b.level);
                        }
                        // Если уровни равны, сортируем по названию
                        return a.name.localeCompare(b.name);
                    });

                    setSpells(sortedSpells);
                    localStorage.setItem(SPELLS_KEY, JSON.stringify(sortedSpells));

                    const monstersResponse = await fetch(`${process.env.PUBLIC_URL}/data/monsters.json`);
                    const monstersData = await monstersResponse.json();


                    // Сортировка заклинаний по алфавиту и уровню
                    const sortedMonsters = monstersData.sort((a, b) => {
                        // Сначала сортируем по уровню
                        return a.name.localeCompare(b.name);
                    });

                    setMonsters(sortedMonsters);
                    localStorage.setItem(MONSTERS_KEY, JSON.stringify(sortedMonsters));
                }

                // Загружаем закладки из localStorage
                if (cachedBookmarks) {
                    setBookmarks(JSON.parse(cachedBookmarks));
                }

                setIsLoading(false);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Сохраняем закладки в localStorage при изменении
    useEffect(() => {
        localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    }, [bookmarks]);

    // Добавление новой закладки
    const addBookmark = (name) => {
        const newBookmark = {
            id: Date.now(),
            name,
            spells: [],
            monsters: [],
        };
        setBookmarks([...bookmarks, newBookmark]);
    };

    // Добавление заклинания в закладку
    const addSpellToBookmark = (bookmarkId, spell) => {
        setBookmarks(bookmarks.map(bookmark =>
            bookmark.id === bookmarkId
                ? { ...bookmark, spells: [...bookmark.spells, spell] }
                : bookmark
        ));
    };

    // Добавление монстра в закладку
    const addMonsterToBookmark = (bookmarkId, monster) => {
        setBookmarks(bookmarks.map(bookmark =>
            bookmark.id === bookmarkId
                ? { ...bookmark, monsters: [...bookmark.monsters, monster] }
                : bookmark
        ));
    };

    // Удаление заклинания из закладки
    const removeSpellFromBookmark = (bookmarkId, spellId) => {
        setBookmarks(bookmarks.map(bookmark =>
            bookmark.id === bookmarkId
                ? { ...bookmark, spells: bookmark.spells.filter(spell => spell.name !== spellId) }
                : bookmark
        ));
    };

    // Удаление монстра из закладки
    const removeMonsterFromBookmark = (bookmarkId, monsterId) => {
        setBookmarks(bookmarks.map(bookmark =>
            bookmark.id === bookmarkId
                ? { ...bookmark, monsters: bookmark.monsters.filter(monster => monster.name !== monsterId) }
                : bookmark
        ));
    };

    // Удаление закладки
    const removeBookmark = (bookmarkId) => {
        setBookmarks(bookmarks.filter(bookmark => bookmark.id !== bookmarkId));
    };

    // Переименование закладки
    const renameBookmark = (bookmarkId, newName) => {
        setBookmarks(bookmarks.map(bookmark =>
            bookmark.id === bookmarkId
                ? { ...bookmark, name: newName }
                : bookmark
        ));
    };

    // Отображение загрузки
    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    return (
        <div>
            <NavBar />
            <Routes>
                {/* Главная страница с заклинаниями */}
                <Route path="/" element={<HomePage spells={spells} bookmarks={bookmarks} addSpellToBookmark={addSpellToBookmark} addBookmark={addBookmark} />} />
                <Route path="/spells" element={<HomePage spells={spells} bookmarks={bookmarks} addSpellToBookmark={addSpellToBookmark} addBookmark={addBookmark} />} />
                {/* Страница с деталями заклинания */}
                <Route path="/spells/:spellName" element={<SpellDetailPage spells={spells} bookmarks={bookmarks} addSpellToBookmark={addSpellToBookmark} addBookmark={addBookmark} />} />

                {/* Страница с бестиарием */}
                <Route path="/bestiary" element={<BestiaryPage monsters={monsters} bookmarks={bookmarks} addMonsterToBookmark={addMonsterToBookmark} addBookmark={addBookmark} />} />

                {/* Страница с деталями монстра */}
                <Route path="/bestiary/:monsterName" element={<MonsterDetailPage monsters={monsters} bookmarks={bookmarks} addMonsterToBookmark={addMonsterToBookmark} addBookmark={addBookmark} />} />

                {/* Страница с закладками */}
                <Route path="/bookmarks" element={<BookmarksPage bookmarks={bookmarks} removeBookmark={removeBookmark} removeSpellFromBookmark={removeSpellFromBookmark} removeMonsterFromBookmark={removeMonsterFromBookmark} renameBookmark={renameBookmark} />} />

                {/* Страница с деталями закладки */}
                <Route path="/bookmarks/:bookmarkId" element={<BookmarkDetailPage bookmarks={bookmarks} removeBookmark={removeBookmark} removeSpellFromBookmark={removeSpellFromBookmark} removeMonsterFromBookmark={removeMonsterFromBookmark} renameBookmark={renameBookmark} addSpellToBookmark={addSpellToBookmark} addBookmark={addBookmark} addMonsterToBookmark={addMonsterToBookmark} />} />
            </Routes>
        </div>

    );
}

export default App;