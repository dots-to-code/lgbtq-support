import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { BaseLayout } from '../components/BaseLayout';
import { Container, Box, Typography, Button } from '@mui/material';
import { SearchInput } from '../components/SearchInput';
import { SpeechBubble } from '../components/SpeechBubble';
import { useNavigate, useParams } from 'react-router-dom';
import { getConsultationById, getData, getConsultationResponseById } from '../utils/getData';
import Loading from '../components/Loading';
import { consultationsState, consultationResponseState } from '../state';

export default function ConsultationDetail() {
  const [loading, setIsLoading] = useState(true);
  const [consultation, setConsultation] = useRecoilState(consultationsState);
  const [consultationResponse, setConsultationResponse] = useRecoilState(consultationResponseState);
  const navigate = useNavigate();

  const { id: consultationId } = useParams();

  const ContainerStyle = {
    display: 'flex',
    flexDirection: 'column', // 縦方向に配置する
    alignItems: 'center', // 中央揃え
  };

  const ButtonStyle = {
    position: 'fixed',
    bottom: '75px',
    right: '10px',
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
      <SpeechBubble key={index} user={item.user}>
        <Typography sx={{ fontSize: '12px' }}>{item.fields.content}</Typography>
      </SpeechBubble>
    ));
  };

  const handlePost = () => {
    navigate(`/consultation/answer/${consultationId}`);
  };

  useEffect(() => {
    const getInitData = async () => {
      setIsLoading(true);
      try {
        const [consultationResponse, usersList, consultation] = await Promise.all([
          // consultationIdを指定して取得したいけど、LinkedIdにどうしてもうまくあてて検索できず暫定で全部取ってます
          getData('getConsultationResponse'),
          getData('getusers'),
          getConsultationById(consultationId),
        ]);

        const usersMap = usersList.reduce((map, user) => {
          map[user.id] = user;
          return map;
        }, {});

        const targetUser = usersMap[consultation.user_id];
        const user = {
          ...targetUser,
          name: targetUser.fields.name,
          children: JSON.parse(targetUser.fields.children),
        };
        const targetConsultation = {
          ...consultation,
          user: user,
        };

        let responseList = consultationResponse
          .map((item) => {
            if (item.fields.consultation_id[0] === consultationId) {
              const user = {
                id: usersMap[item.fields.user_id[0]].id,
                name: usersMap[item.fields.user_id[0]].fields.name,
                // TODO: エラーになるので一旦コメントアウト
                // children: JSON.parse(usersMap[item.fields.user_id[0]].fields.children),
              };
              return {
                ...item,
                user: user,
              };
            }
          })
          .filter((item) => item !== undefined);

        responseList.sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime));
        setConsultationResponse(responseList);
        setConsultation(targetConsultation);
      } catch (error) {
        console.error('An error occurred:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getInitData();
    console.log('consultation:', consultation);
  }, []);

  return (
    <BaseLayout>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Box sx={{ m: 4, display: 'flex', justifyContent: 'center' }}>
            <SearchInput />
          </Box>
          <Container maxWidth="sm" sx={ContainerStyle}>
            <SpeechBubble user={consultation.user} isDispFavoButoon="true">
              <Typography sx={{ fontSize: '12px' }}>{consultation.content}</Typography>
            </SpeechBubble>
            <ConsultationResponseList list={consultationResponse} />
            <Button sx={ButtonStyle} variant="contained" onClick={handlePost}>
              相談に答える
            </Button>
          </Container>
        </>
      )}
    </BaseLayout>
  );
}
