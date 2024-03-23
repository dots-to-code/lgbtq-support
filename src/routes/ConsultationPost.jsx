import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useAuth0 } from '@auth0/auth0-react';
import { BaseLayout } from '../components/BaseLayout';
import { OvalButton } from '../components/OvalButton';
import { SpeechBubble } from '../components/SpeechBubble';
import { Container, TextField } from '@mui/material';
import { usersSelector } from '../state';

export default function ConsultationPost() {
  const { user } = useAuth0();
  const [inputValue, setInputValue] = useState('');
  const users = useRecoilValue(usersSelector);
  const [myAccountData, setMyAccountData] = useState(() => {
    const userData = users.find((u) => u.fields.email === user.email);
    const children = userData.fields.children ? JSON.parse(userData.fields.children) : "";
    return userData ? { ...userData.fields, children: children } : null;
  });

  console.log(myAccountData);

  const ContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '30px',
  };

  const TextFieldStyle = {
    width: 'calc(100% - 5px)',
    height: '100%',
    marginTop: '10px',
    marginBottom: '15px',
    backgroundColor: '#E3E3E3',
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handlePost = () => {
    // TextField の入力が空の場合は処理を行わない
    if (!inputValue.trim()) {
      return;
    }
    // ここにDBへの登録処理を記述
    window.alert('相談登録処理');
  };

  return (
    <BaseLayout>
      <Container maxWidth="sm" sx={ContainerStyle}>
        <SpeechBubble user={myAccountData} customStyle={{ marginBottom: '35px' }}>
          <TextField
            placeholder="入力する"
            multiline
            rows={7}
            variant="outlined"
            value={inputValue}
            onChange={handleInputChange}
            sx={TextFieldStyle}
          />
        </SpeechBubble>
        <OvalButton onClick={handlePost} disabled={!inputValue.trim()}>
          相談を投稿する
        </OvalButton>
      </Container>
    </BaseLayout>
  );
}
