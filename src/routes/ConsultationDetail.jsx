import { BaseLayout } from '../components/BaseLayout';
import { Container, Box, Typography, Button } from '@mui/material';
import { SearchInput } from '../components/SearchInput';
import { SpeechBubble } from '../components/SpeechBubble';
import { useNavigate } from 'react-router-dom';


export default function ConsultationDetail({ id }) {

  const navigate = useNavigate();

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
  }

  // 回答スタブ DBから問い合わせる
    const responses = [
        {
          id: 2,
          name: '2コウテイペンギン',
          content: '回答内容が入ります回答内容が入ります回答内容が入ります回答内容が入ります回答内容が入ります回答内容が入ります',
          children: [
            {
              id: 2,
              birthday: '2019-03-16',
              gender: 'FEMALE',
            },
          ],
        },
        {
          id: 3,
          name: '3コウテイペンギン',
          content: '回答内容が入ります回答内容が入ります回答内容が入ります回答内容が入ります回答内容が入ります回答内容が入ります',
          children: [
            {
              id: 3,
              birthday: '2015-03-16',
              gender: 'UNKNOWN',
            },
          ],
        },
        {
          id: 4,
          name: '4コウテイペンギン',
          content: '回答内容が入ります回答内容が入ります回答内容が入ります回答内容が入ります回答内容が入ります回答内容が入ります',
          children: [
            {
              id: 2,
              birthday: '2019-03-16',
              gender: 'FEMALE',
            },
          ],
        },
        {
          id: 5,
          name: '5コウテイペンギン',
          content: '回答内容が入ります回答内容が入ります回答内容が入ります回答内容が入ります回答内容が入ります回答内容が入ります',
          children: [
            {
              id: 3,
              birthday: '2015-03-16',
              gender: 'UNKNOWN',
            },
          ],
        },
        {
          id: 6,
          name: '6コウテイペンギン',
          content: '回答内容が入ります回答内容が入ります回答内容が入ります回答内容が入ります回答内容が入ります回答内容が入ります',
          children: [
            {
              id: 3,
              birthday: '2015-03-16',
              gender: 'UNKNOWN',
            },
          ],
        },
  ];

  const ContainerStyle = {
    display: 'flex',
    flexDirection: 'column', // 縦方向に配置する
    alignItems: 'center', // 中央揃え
  }

  const ButtonStyle = {
    position: 'fixed',
    bottom: '88px',
    right: '16px',
    height: '54px',
    borderRadius: '16px',
    backgroundColor: '#F6ADA8',
    color: 'black',
    '&::after': {
      content: '""',
      position: 'absolute',
      margin: 0,
      bottom: '-16px',
      right: '16px',
      width: 0,
      height: 0,
      borderTop: '30px solid #F6ADA8',
      borderLeft: '12px solid transparent',
      borderRight: '12px solid transparent',
      transform: 'rotate(35deg)',
      zIndex: '-1',
    },
    '&:hover': {
      backgroundColor: '#F6ADA8',
      opacity: 0.7,
    },
  };

  const ConsultationResponseList = ({ list }) => {

    return list.map((item, index) => (
      <SpeechBubble key={index} user={item} isDispGoodIcon="true">
        <Typography>{item.content}</Typography>
      </SpeechBubble>
    ));

  }

  const handlePost = () => {
    window.alert('相談回答画面に遷移');
  };

  return (
    <BaseLayout>
      <Box sx={{ m: 4, display: 'flex', justifyContent: 'center' }}>
        <SearchInput />
      </Box>
      <Container maxWidth="sm" sx={ContainerStyle}>
        <SpeechBubble user={data} isDispFavoButoon="true">
          <Typography>{data.content}</Typography>
        </SpeechBubble>
        <ConsultationResponseList list={responses}/>
        <Button sx={ButtonStyle} variant="contained" onClick={handlePost}>
          相談に答える
        </Button>
      </Container>
    </BaseLayout>
  );
}
