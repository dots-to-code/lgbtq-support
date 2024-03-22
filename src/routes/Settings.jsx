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
  const [numberOfChildren, setNumberOfChildren] = useState(NaN);
  const [childrenData, setChildrenData] = useState([]);
  const [aboutText, setAboutText] = useState('');
  const [loading, setLoading] = useState(false);

  const LabelStyle = { fontWeight: 600 };
  const spacing = { margin: '12px' };
  const palette = {
    backgroundColor: 'white',
    border: '1px solid #EB6159',
    borderRadius: '10px',
    height: '40px',
    padding: '12px',
    marginTop: '12px',
    display: 'flex',
    justifyContent: 'center',
  };

  const boxStyle = {
    border: '1px solid #EB6159',
    padding: '12px',
    borderRadius: '10px',
    backgroundColor: 'white',
    width: '335px',
    marginBottom: '20px',
  };

  const handleSubmit = async () => {
    setLoading(true);
    const payload = {
      content: aboutText,
      email: user.email,
      childrenPayload: childrenData.map((child) => ({
        id: child.id,
        birthday: child.birthday,
        gender: child.gender,
      })),
    };
    await postData(payload, 'postUsersChildren').then((res) => {
      setNumberOfChildren(NaN);
      setChildrenData([]);
      setAboutText('');
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
        <Box key={i} sx={{ marginTop: '6px' }}>
          <Typography>{i + 1}人目のお子さん</Typography>
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
      <Stack sx={{ alignItems: 'center', textAlign: 'center', width: '335px', margin: 'auto' }}>
        <h1 style={{ alignSelf: 'center', ...SubTitleStyle }}>Account</h1>
        <Box sx={boxStyle}>
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
          <Box sx={boxStyle}>
            <Typography>お子さんについて教えてください</Typography>
            <TextField
              variant="standard"
              value={numberOfChildren}
              InputProps={{
                disableUnderline: true,
              }}
              placeholder="子供の数..."
              type="number"
              min={0}
              max={20}
              style={palette}
              onWheel={() => document.activeElement.blur()}
              onChange={(e) => setNumberOfChildren(e.target.value)}
            />
            {numberOfChildren > 0 && renderChildInputs()}
            <Typography>あなたについて教えてください</Typography>
            <TextField
              variant="standard"
              value={aboutText}
              multiline
              minRows={4}
              InputProps={{
                disableUnderline: true,
              }}
              placeholder="自己紹介（200文字以内）..."
              style={{ ...palette, height: '100px' }}
              onChange={(e) => setAboutText(e.target.value)}
            />
            <Button
              style={{
                ...ButtonStyle,
                marginTop: '12px',
                '& .MuiInputBase-input': {
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                },
                '&:hover': {
                  cursor: 'pointer !important',
                  backgroundColor: '#EB6159',
                },
              }}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? '読み込み中...' : '送信する'}
            </Button>
          </Box>
        </Box>
      </Stack>
    </BaseLayout>
  );
}
