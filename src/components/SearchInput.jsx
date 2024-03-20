import { useState } from 'react';
import { Paper, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const SearchInput = () => {
  const [searchText, setSearchText] = useState('');
  const handleSearchChange = (event) => setSearchText(event.target.value);
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      window.find(searchText);
    }
  };

  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: '460px',
        borderRadius: '30px',
      }}
    >
      <IconButton
        type="button"
        sx={{ p: '10px', color: '#EB6159' }}
        aria-label="search"
        onClick={() => window.find(searchText)}
      >
        <SearchIcon />
      </IconButton>
      <InputBase
        value={searchText}
        onKeyDown={handleKeyDown}
        onChange={handleSearchChange}
        sx={{ ml: 1, flex: 1 }}
        placeholder="キーワードでさがす"
        inputProps={{ 'aria-label': 'キーワードでさがす' }}
      />
    </Paper>
  );
};
