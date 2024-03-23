import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../components/LogoutButton';
import { BaseLayout } from '../components/BaseLayout';
import { Box, Button, Typography, Stack, TextField, MenuItem } from '@mui/material';
import { SubTitleStyle, ButtonStyle } from '../styles';
import { GENDER } from '../constants';
import { postData } from '../utils/postData';
import { usersSelector } from '../state';

export default function Settings() {
  const { user } = useAuth0();
  const [numberOfChildren, setNumberOfChildren] = useState('');
  const [childrenData, setChildrenData] = useState([]);
  const [aboutText, setAboutText] = useState('');
  const users = useRecoilValue(usersSelector);
  const [myAccountData, setMyAccountData] = useState(users.find((u) => u.fields.email === user.email).fields);
  const [loading, setLoading] = useState(false);

  const LabelStyle = { fontWeight: 900 };
  const spacing = { margin: '12px', textAlign: 'left' };
  const border = {
    padding: '12px',
    marginTop: '12px',
    backgroundColor: 'white',
    border: '1px solid #EB6159',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '10px',
  };
  const palette = {
    ...border,
    height: '40px',
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
      setNumberOfChildren('');
      setChildrenData([]);
      setAboutText('');
      setMyAccountData(res);
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

  const getAge = (dateOfBirth) => {
    const birthday = new Date(dateOfBirth);
    const today = new Date();
    return today.getFullYear() - birthday.getFullYear();
  };

  return (
    <BaseLayout>
      <Stack sx={{ alignItems: 'center', textAlign: 'center', width: '335px', margin: 'auto' }}>
        <h1 style={{ alignSelf: 'center', ...SubTitleStyle }}>Account</h1>
        <Box sx={{ ...boxStyle }}>
          <Typography sx={spacing}>
            <span style={LabelStyle}>名前：</span>
            <br />
            {user.name}
          </Typography>
          <Typography sx={spacing}>
            <span style={LabelStyle}>メール：</span>
            <br />
            {user.email}
          </Typography>
          {
            <>
              <Typography sx={spacing}>
                <span style={LabelStyle}>子供：</span>
                <br />
                {myAccountData.children &&
                  JSON.parse(myAccountData.children).map(
                    (child, index) =>
                      `${getAge(child?.birthday)}さい ${GENDER[child?.gender]}${JSON.parse(myAccountData.children).length - 1 > index ? ' / ' : ''}`,
                  )}
              </Typography>
              <Typography sx={spacing}>
                <span style={LabelStyle}>自己紹介：</span>
                {myAccountData.content}
              </Typography>
            </>
          }
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
              InputProps={{
                disableUnderline: true,
              }}
              placeholder="自己紹介（200文字以内）..."
              style={{
                ...border,
                height: '60px',
                '& .MuiInputBaseInput': {
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                },
              }}
              onChange={(e) => setAboutText(e.target.value)}
            />
            <Button
              style={{
                ...ButtonStyle,
                marginTop: '12px',

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
