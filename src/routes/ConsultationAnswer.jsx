import { useRef, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BaseLayout } from '../components/BaseLayout';
import { SpeechBubble } from '../components/SpeechBubble';
import { UserInfo } from '../components/UserInfo';
import { Container, Typography, Box, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Loading from '../components/Loading';
import { getConsultationById, getUserById } from '../utils/getData';
import { useParams } from 'react-router-dom';
import { consultationState, usersSelector } from '../state';
import { postData } from '../utils/postData';

export default function ConsultationAnswer() {
  const { user } = useAuth0();
  const { id: consultationId } = useParams();
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [consultation, setConsultation] = useRecoilState(consultationState);
  const users = useRecoilValue(usersSelector);
  const [myAccountData, setMyAccountData] = useState(users.find((u) => u.fields.email === user.email).fields);

  const textAreaRef = useRef(null);

  const fetchData = async () => {
    const result = await getConsultationById(consultationId);
    const consultationUserRes = await getUserById(result.user_id);
    const consultationUser = {
      ...consultationUserRes,
      user_id: [result.id],
      children: JSON.parse(consultationUserRes.children),
    };
    console.log(myAccountData);
    return { ...result, user: consultationUser };
  };

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

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const result = await fetchData();
      setConsultation(result);
    };
    (async () => {
      try {
        getData();
      } catch (error) {
        console.error('An error occurred:', error);
      } finally {
        setLoading(false);
      }
    })();
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

  const handleClickSendButton = async () => {
    setLoading(true);
    const records = [
      {
        fields: {
          consultation_id: [consultationId],
          user_id: [consultation.user_id[0]],
          content: inputValue,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      },
    ];
    try {
      await postData({ records }, 'postConsultationAnswer');
      const result = await fetchData();
      setConsultation(result);
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setLoading(false);
      setInputValue('');
    }
  };

  return (
    <BaseLayout>
      {loading || !consultation ? (
        <Loading />
      ) : (
        <>
          <Container maxWidth="sm">
            <SpeechBubble user={consultation.user}>
              <Typography>{consultation.content}</Typography>
            </SpeechBubble>
          </Container>
          <Box sx={BoxStyle}>
            <UserInfo user={myAccountData} hiddenChildren={true} />
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
              {inputValue ? (
                <SendIcon fontSize="large" sx={IconStyle} onClick={handleClickSendButton} />
              ) : (
                <SendIcon fontSize="large" sx={{ ...IconStyle, opacity: 0.5, cursor: 'not-allowed' }} />
              )}
            </Box>
          </Box>
        </>
      )}
    </BaseLayout>
  );
}
