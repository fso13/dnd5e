import React from 'react';
import { Grid } from '@mui/material';
import MonsterCard from './MonsterCard';


const MonsterCards = ({ monsters, bookmarks, addMonsterToBookmark, addBookmark }) => {


    return (
        <div>
            <Grid container spacing={3} justifyContent="center">
                {monsters.map((monster, index) => {
                    return <MonsterCard monster={monster} index={index} bookmarks={bookmarks} addMonsterToBookmark={addMonsterToBookmark} addBookmark={addBookmark}/>
                })}
            </Grid>
        </div>
    );
};

export default MonsterCards;