import { useState } from 'react';
import { BaseLayout } from '../components/BaseLayout';
import { OvalButton } from '../components/OvalButton';
import { SpeechBubble } from '../components/SpeechBubble';
import { Container, TextField } from '@mui/material';

export default function ConsultationPost() {
  const [inputValue, setInputValue] = useState('');

  const user = {
    id: 1,
    name: 'コウテイペンギン',
    content: '相談内容が入ります相談内容が入ります相談内容が入ります相談内容が入ります相談内容が入ります相談内容が入ります相談内容が入ります相談内容が入ります相談内容が入ります相談内容が入ります相談内容が入ります相談内容が入ります相談内容が入ります相談内容が入ります相談内容が入ります相談内容が入ります',
    children: [
      {
        id: 1,
        birthday: '2020-03-16',
        gender: 'MALE',
      },
      {
        id: 2,
        birthday: '2024-01-16',
        gender: 'MALE',
      },
    ],
  };

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
        <SpeechBubble user={user} customStyle={{ marginBottom: '35px' }}>
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
        <OvalButton onClick={handlePost} disabled={!inputValue.trim()}>相談を投稿する</OvalButton>
      </Container>
    </BaseLayout>
  );
}
