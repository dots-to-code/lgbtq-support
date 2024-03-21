import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../components/LogoutButton';
import { BaseLayout } from '../components/BaseLayout';
import { Box, Button, Typography, Stack, TextField, MenuItem } from '@mui/material';
import { SubTitleStyle, ButtonStyle } from '../styles';
import { GENDER } from '../constants';
import { postData } from '../utils/postData';

export default function Settings() {
  const { user } = useAuth0();
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [childrenData, setChildrenData] = useState([]);
  const [loading, setLoading] = useState(false);

  const LabelStyle = { fontWeight: 600 };
  const spacing = { marginBottom: '12px' };
  const palette = {
    backgroundColor: 'white',
    border: '1px solid #EB6159',
    borderRadius: '50px',
    height: '60px',
    padding: '15px',
    marginTop: '10px',
    width: '335px',
    display: 'flex',
  };

  const handleSubmit = async () => {
    setLoading(true);
    const payload = {
      email: user.email,
      childrenPayload: childrenData.map((child) => ({
        id: child.id,
        birthday: child.birthday,
        gender: child.gender,
      })),
    };
    await postData(payload, 'postUsersChildren').then((res) => {
      setChildrenData([]);
      setNumberOfChildren(0);
      setLoading(false);
    });
  };

  const handleChildInputChange = (id, field, value) => {
    const updatedChildrenData = [...childrenData];
    // If the child object doesn't exist at the specified id, create it
    if (!updatedChildrenData[id]) {
      updatedChildrenData[id] = {};
    }
    updatedChildrenData[id]['id'] = id;
    updatedChildrenData[id][field] = value;
    setChildrenData(updatedChildrenData);
  };

  const renderChildInputs = () => {
    const childrenInputs = [];
    for (let i = 0; i < numberOfChildren; i++) {
      childrenInputs.push(
        <Box key={i} sx={{ marginTop: '20px' }}>
          <Typography variant="h6">{i + 1}人目のお子さん</Typography>
          <TextField
            InputProps={{
              disableUnderline: true,
            }}
            fullWidth
            type="date"
            variant="standard"
            style={palette}
            onChange={(e) => handleChildInputChange(i, 'birthday', e.target.value)}
          />
          <TextField
            select
            fullWidth
            variant="standard"
            style={palette}
            InputProps={{
              disableUnderline: true,
            }}
            onChange={(e) => handleChildInputChange(i, 'gender', e.target.value)}
          >
            <MenuItem value="MALE">{GENDER['MALE']}</MenuItem>
            <MenuItem value="FEMALE">{GENDER['FEMALE']}</MenuItem>
            <MenuItem value="UNKNOWN">{GENDER['UNKNOWN']}</MenuItem>
          </TextField>
        </Box>,
      );
    }
    return childrenInputs;
  };

  return (
    <BaseLayout>
      <Stack sx={{ alignItems: 'center' }}>
        <h1 style={{ alignSelf: 'center', ...SubTitleStyle }}>Account</h1>
        <Box
          sx={{
            margin: '20px',
            border: '1px solid #EB6159',
            padding: '20px',
            borderRadius: '10px',
            backgroundColor: 'white',
          }}
        >
          <Typography sx={spacing}>
            <span style={LabelStyle}>名前：</span>
            {user.name}
          </Typography>
          <Typography sx={spacing}>
            <span style={LabelStyle}>メール：</span>
            {user.email}
          </Typography>
          <Typography sx={spacing}>
            <span style={LabelStyle}>ニックネーム：</span>
            {user.nickname}
          </Typography>
          <LogoutButton style={{ alignSelf: 'center' }} />
        </Box>
        <Box>
          <Typography>お子さんについて教えてください</Typography>
          <TextField
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
            placeholder="子供の数..."
            type="number"
            min="0"
            max="20"
            style={palette}
            onWheel={() => document.activeElement.blur()}
            onChange={(e) => setNumberOfChildren(e.target.value)}
          />
          {numberOfChildren > 0 && renderChildInputs()}
          <Typography>あなたについて教えてください</Typography>
        </Box>

        <Button sx={ButtonStyle} onClick={handleSubmit} disabled={loading}>
          {loading ? '読み込み中' : '送信する'}
        </Button>
      </Stack>
    </BaseLayout>
  );
}
