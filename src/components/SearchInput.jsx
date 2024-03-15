import { Paper, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const SearchInput = () => {
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
      <IconButton type="button" sx={{ p: '10px', color: '#EB6159' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="キーワードでさがす"
        inputProps={{ 'aria-label': 'キーワードでさがす' }}
      />
    </Paper>
  );
};
