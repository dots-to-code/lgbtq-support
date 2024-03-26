import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useAuth0 } from '@auth0/auth0-react';
import { BaseLayout } from '../components/BaseLayout';
import { OvalButton } from '../components/OvalButton';
import { Container, TextField, Snackbar, IconButton, Backdrop } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { SpeechBubble } from '../components/SpeechBubble';
import { usersSelector } from '../state';
import { postData } from '../utils/postData';
import { useNavigate } from 'react-router-dom';

export default function ConsultationPost() {
  const { user } = useAuth0();
  const [inputValue, setInputValue] = useState('');
  const users = useRecoilValue(usersSelector);
  const [myAccountData, setMyAccountData] = useState(() => {
    const userData = users.find((u) => u.fields.email === user.email);
    const children = userData.fields.children ? JSON.parse(userData.fields.children) : '';
    const picture = userData.fields.picture || '';
    return userData ? { ...userData.fields, id: userData.id, children: children, picture } : null;
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);

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
    handleSubmit();
  };

  const handleSubmit = async () => {
    setLoading(true);
    const payload = {
      userId: [myAccountData.id],
      content: inputValue,
    };
    await postData(payload, 'postConsultations').then((res) => {
      setLoading(false);
      setOpen(true);
      setOpenSnackbar(true);
      setIsInitialRender(false);
    });
  };

  useEffect(() => {
    if (!openSnackbar && !isInitialRender) {
      navigate(`/consultation`);
    }
  }, [openSnackbar, navigate, isInitialRender]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const action = (
    <>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

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
      <Snackbar
        open={open}
        autoHideDuration={20000}
        onClose={handleClose}
        message="登録が完了しました！"
        action={action}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: 'white',
            color: 'black',
            width: '80%',
            maxWidth: '400px',
          },
        }}
        ContentProps={{
          sx: {
            fontSize: '1.2rem',
            fontWeight: 'bold',
          },
        }}
      />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openSnackbar}
        onClick={handleClose}
      />
    </BaseLayout>
  );
}
