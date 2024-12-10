import React from 'react';
import { Box, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        padding: '8px 16px',
        margin: '16px',
      }}
    >
      <SearchIcon color="action" />
      <InputBase
        placeholder="Qué estás buscando?"
        sx={{ marginLeft: '8px', flex: 1 }}
      />
    </Box>
  );
};

export default SearchBar;
