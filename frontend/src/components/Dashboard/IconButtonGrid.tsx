import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';

import { RECIPE_TYPES } from "../../constants/recipeTypes";

interface IconButtonGridProps {
  onTypeSelect: (type: string | null) => void; // Callback to parent
}

const IconButtonGrid: React.FC<IconButtonGridProps> = ({ onTypeSelect }) => {
  const [selected, setSelected] = useState<string | null>(null);

  function manageSelected(newSelected) {
    const updatedSelected = newSelected === selected ? null : newSelected;
    setSelected(updatedSelected);
    onTypeSelect(updatedSelected);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        overflowX: 'auto',
        padding: '16px',
      }}
    >
      {RECIPE_TYPES.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginRight: '16px',
          }}
          onClick={() => manageSelected(item.label)}
        >
          <Box
            sx={{
              padding: '8px',
              backgroundColor: selected === item.label ? 'var(--primary-color)' : 'white',
              borderRadius: '14px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '72px',
              height: '72px',
            }}
          >
            <img
              src={item.icon}
              alt={item.label}
              style={{
                width: '100%',
                height: '100%',
                filter:
                  selected === item.label
                    ? 'invert(100%)'
                    : 'invert(72%) sepia(42%) saturate(6627%) hue-rotate(182deg) brightness(102%) contrast(96%)',
              }}
            />
          </Box>
          <Typography variant="caption" sx={{ marginTop: '8px' }}>
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default IconButtonGrid;
