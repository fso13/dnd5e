import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/spells/HomePage';
import BestiaryPage from './pages/monsters/BestiaryPage';
import SpellDetailPage from './pages/spells/SpellDetailPage';
import MonsterDetailPage from './pages/monsters/MonsterDetailPage';
import BookmarksPage from './pages/bookmarks/BookmarksPage';
import BookmarkDetailPage from './pages/bookmarks/BookmarkDetailPage';
import CharacterSheetPage from './pages/character/CharacterSheetPage';
import CharacterManager from './pages/character/CharacterManager';
import NavBar from './components/NavBar';
import { useSnackbar } from 'notistack';

function App() {
    const [bookmarks, setBookmarks] = useState([]); // Состояние для закладок
    const [spells, setSpells] = useState([]); // Состояние для заклинаний
    const [monsters, setMonsters] = useState([]); // Состояние для монстров
    const [isLoading, setIsLoading] = useState(true); // Состояние для загрузки
    const { enqueueSnackbar } = useSnackbar(); // Хук для уведомлений
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
                    const spellsResponse = await fetch(`${process.env.PUBLIC_URL}/data/spells-new.json`);
                    const spellsData = await spellsResponse.json();

                    // Сортировка заклинаний по алфавиту и уровню
                    const sortedSpells = spellsData.sort((a, b) => {
                        // Сначала сортируем по уровню
                        if (a.level !== b.level) {
                            return compareIndexFound(a, b);
                        }
                        // Если уровни равны, сортируем по названию
                        return a.name.rus.localeCompare(b.name.rus);
                    });

                    setSpells(sortedSpells);
                    localStorage.setItem(SPELLS_KEY, JSON.stringify(sortedSpells));

                    const monstersResponse = await fetch(`${process.env.PUBLIC_URL}/data/monsters-new.json`);
                    const monstersData = await monstersResponse.json();


                    // Сортировка заклинаний по алфавиту и уровню
                    const sortedMonsters = monstersData.sort((a, b) => {
                        // Сначала сортируем по уровню
                        return a.name.rus.localeCompare(b.name.rus);
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
        enqueueSnackbar(`Закладка "${newBookmark.name}" создана`, { variant: 'success' });
    };

    // Добавление заклинания в закладку
    const addSpellToBookmark = (bookmarkId, spell) => {
        setBookmarks(bookmarks.map(bookmark =>
            bookmark.id === bookmarkId
                ? { ...bookmark, spells: [...bookmark.spells, spell] }
                : bookmark
        ));
        enqueueSnackbar(`Заклинание "${spell.name.rus}" добавлено в закладки`, { variant: 'success' });
    };

    // Добавление монстра в закладку
    const addMonsterToBookmark = (bookmarkId, monster) => {
        setBookmarks(bookmarks.map(bookmark =>
            bookmark.id === bookmarkId
                ? { ...bookmark, monsters: [...bookmark.monsters, monster] }
                : bookmark
        ));
        enqueueSnackbar(`Монстер "${monster.name}" добавлено в закладки`, { variant: 'success' });
    };

    // Удаление заклинания из закладки
    const removeSpellFromBookmark = (bookmarkId, spellId) => {
        setBookmarks(bookmarks.map(bookmark =>
            bookmark.id === bookmarkId
                ? { ...bookmark, spells: bookmark.spells.filter(spell => spell.name.rus !== spellId) }
                : bookmark
        ));
        enqueueSnackbar(`Заклинание "${spellId}" удалено из закладки`, { variant: 'error' });
    };

    // Удаление монстра из закладки
    const removeMonsterFromBookmark = (bookmarkId, monsterId) => {
        setBookmarks(bookmarks.map(bookmark =>
            bookmark.id === bookmarkId
                ? { ...bookmark, monsters: bookmark.monsters.filter(monster => monster.name !== monsterId) }
                : bookmark
        ));
        enqueueSnackbar(`Монстр "${monsterId}" удален из закладки`, { variant: 'error' });
    };

    // Удаление закладки
    const removeBookmark = (bookmarkId) => {
        setBookmarks(bookmarks.filter(bookmark => bookmark.id !== bookmarkId));
        enqueueSnackbar(`Закладка удалена`, { variant: 'error' });
    };

    // Переименование закладки
    const renameBookmark = (bookmarkId, newName) => {
        setBookmarks(bookmarks.map(bookmark =>
            bookmark.id === bookmarkId
                ? { ...bookmark, name: newName }
                : bookmark
        ));
        enqueueSnackbar(`Закладка переименованна в ${newName}`, { variant: 'warning' });
    };

    // Отображение загрузки
    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    return (
        <div>
            <NavBar />
            <Routes>
                <Route path="/character-sheet" element={<CharacterManager />} />
                <Route path="/character-sheet/:id" element={<CharacterSheetPage />} />
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

function compareIndexFound(a, b) {
    if (a.level < b.level) { return -1; }
    if (a.level > b.level) { return 1; }
    return 0;
}

export default App;