import { useRef, useEffect, useState } from 'react';
import { BaseLayout } from '../components/BaseLayout';
import { SpeechBubble } from '../components/SpeechBubble';
import { UserInfo } from '../components/UserInfo';
import { Container, Typography, Box, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function ConsultationAnswer() {
  const [inputValue, setInputValue] = useState('');
  const textAreaRef = useRef(null);

  useEffect(() => {
    const adjustTextAreaHeight = () => {
      const textArea = textAreaRef.current;
      if (textArea) {
        textArea.style.height = 'auto';
        textArea.style.height = `${textArea.scrollHeight}px`;
        if (textArea.offsetHeight < 40) {
          textArea.style.height = '40px';
        }
      }
    };

    const handleInput = () => {
      adjustTextAreaHeight();
    };

    const textArea = textAreaRef.current;
    if (textArea) {
      // 初期値によってtextareaの高さを調整
      adjustTextAreaHeight();

      // 入力値によってtextareaの高さを調整
      textArea.addEventListener('input', handleInput);
    }

    return () => {
      if (textArea) {
        textArea.removeEventListener('input', handleInput);
      }
    };
  }, []);

  const BoxStyle = {
    maxWidth: '600px',
    display: 'flex',
    backgroundColor: 'white',
    width: '100%',
    position: 'fixed',
    bottom: '58px',
    left: '50%',
    transform: 'translateX(-50%)',
    flexDirection: 'column',
  };

  const TextFieldStyle = {
    width: 'calc(100% - 100px)',
    margin: '10px',
    backgroundColor: '#E3E3E3',
    flexGrow: 1,
    mr: 1,
  };

  const IconStyle = {
    color: '#EB6159',
    '&:hover': {
      opacity: 0.7,
    },
  };

  const handleClickSendButton = () => {
    // DBに値を登録する
    window.alert('回答送信');
  };

  // スタブ DBから問い合わせる
  const data = {
    id: 1,
    name: '1コウテイペンギン',
    content:
      '相談内容が入ります相談内容が入ります相談内容が入ります相談内容が入ります相談内容が入ります相談内容が入ります',
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

  // スタブ ログインユーザー情報 DBから問い合わせる
  const loginUser = {
    id: 2,
    name: '2ジェンツーペンギン',
    children: [
      {
        id: 1,
        birthday: '2020-03-16',
        gender: 'MALE',
      },
    ],
  };

  return (
    <BaseLayout>
      <Container maxWidth="sm">
        <SpeechBubble user={data}>
          <Typography>{data.content}</Typography>
        </SpeechBubble>
      </Container>
      <Box sx={BoxStyle}>
        <UserInfo user={loginUser} />
        <Box display="flex" alignItems="center" sx={{ m: 1 }}>
          <TextField
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            inputRef={textAreaRef}
            placeholder=""
            multiline
            minRows={1}
            maxRows={10}
            variant="outlined"
            sx={TextFieldStyle}
          />
          <SendIcon fontSize="large" sx={IconStyle} onClick={handleClickSendButton} />
        </Box>
      </Box>
    </BaseLayout>
  );
}
