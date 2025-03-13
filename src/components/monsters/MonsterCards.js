import React from 'react';
import { Grid2 } from '@mui/material';
import MonsterCard from './MonsterCard';


const MonsterCards = ({ monsters, bookmarks, addMonsterToBookmark, addBookmark }) => {


    return (
        <div>
            <Grid2 container spacing={3} justifyContent="center">
                {monsters.map((monster, index) => {
                    return <MonsterCard monster={monster} index={index} bookmarks={bookmarks} addMonsterToBookmark={addMonsterToBookmark} addBookmark={addBookmark}/>
                })}
            </Grid2>
        </div>
    );
};

export default MonsterCards;