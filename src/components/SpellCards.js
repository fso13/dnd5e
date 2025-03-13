import React from 'react';
import { Grid2 } from '@mui/material';
import SpellCard from './SpellCard';

const SpellCards = ({ spells }) => {
    return (
        <div>
            <Grid2 container spacing={3} justifyContent="center">
                {spells.map((spell, index) => {
                    return <SpellCard spell={spell} index={index} />
                })}
            </Grid2>

        </div>
    );
};

export default SpellCards;