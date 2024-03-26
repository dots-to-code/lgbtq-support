import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useAuth0 } from '@auth0/auth0-react';
import { usersSelector } from '../state';
import { getFavriteByUserId, getConsultationsByIds } from '../utils/getData';
import { BaseLayout } from '../components/BaseLayout';
import { GENDER } from '../constants';
import { useNavigate } from 'react-router-dom';
import { SearchInput } from '../components/SearchInput';
import Loading from '../components/Loading';
import { Box, Container, Stack, ListItemText, Typography } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

export default function Favorites() {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const users = useRecoilValue(usersSelector);
  const [usersMap, setUsersMap] = useState(() =>
    users.reduce((map, user) => {
      map[user.id] = user;
      return map;
    }, {})
  );
  const [myAccountData, setMyAccountData] = useState(() => {
    const userData = users.find((u) => u.fields.email === user.email);
    const children = userData.fields.children ? JSON.parse(userData.fields.children) : '';
    return userData ? { ...userData.fields, userId: userData.fields.id, id: userData.id, children: children } : null;
  });
  const [loading, setLoading] = useState(false);
  const [favoriteConsultations, setFavoriteConsultations] = useState(false);

  const fetchData = async () => {
    const result = await getFavriteByUserId(myAccountData.userId);
    const consultationIds = result.map((item) => item.fields.consultation_id[0]);
    const consultationList = await getConsultationsByIds(consultationIds);

    // お気に入りの登録順でソート
    const sortedList = consultationList.map((consultation) => {
      const favorite = result.find((item) => item.fields.consultation_id[0] === consultation.id);
      return {
        ...consultation,
        created_at: favorite.fields.created_at,
      };
    }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return sortedList;
  };

  useEffect(() => {
    const getConsultationData = async () => {
      setLoading(true);
      try {
        const result = await fetchData();
        const list = result.map((consultation) => {
          const userId = consultation.fields.user_id[0];
          const user = usersMap[userId];
          return {
            ...consultation,
            user: user,
          };
        });
        setFavoriteConsultations(list);
      } catch (error) {
        console.error('An error occurred:', error);
      } finally {
        setLoading(false);
      }
    };

    getConsultationData();
  }, []);

  const ListItemStyle = {
    py: 2.5,
    display: 'block',
    borderTop: '1px solid',
    borderColor: '#EB6159',
    '&:last-child': {
      borderBottom: '1px solid',
      borderColor: '#EB6159',
    },
    '&:hover': {
      cursor: 'pointer',
      opacity: 0.7,
    },
  };

  const ConsultationList = () => {
    const displayChilden = (children) => {
      return children.map((child, index) => {
        const birthday = new Date(child.birthday);
        const today = new Date();
        const age = today.getFullYear() - birthday.getFullYear();

        return (
          <span style={{ fontSize: '10px' }} key={`text-${index}`}>
            {`${age}さい ${GENDER[child.gender]}${children.length - 1 > index ? ' / ' : ''}`}
          </span>
        );
      });
    };

    const handleClickDetail = (item) => () => {
      navigate(`/consultation/${item.id}`);
    };

    return (
      <Stack sx={{ width: '100%', maxWidth: 850 }}>
        {loading && <Loading size={'50px'} />}
        {favoriteConsultations &&
          favoriteConsultations.map((item) => (
            <Box key={`box-${item.id}`} sx={ListItemStyle} onClick={handleClickDetail(item)}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <AccountCircleRoundedIcon fontSize={'large'} sx={{ color: '#393532', mr: 1 }} />
                {
                  <ListItemText
                    primary={item.user.fields.name}
                    secondary={
                      (item.user.fields.children &&
                        JSON.parse(item.user.fields.children).length &&
                        displayChilden(JSON.parse(item.user.fields.children))) ||
                      '-'
                    }
                    secondaryTypographyProps={{
                      color: '#000',
                    }}
                  />
                }
              </div>
              <Typography
                sx={{
                  fontSize: '12px',
                  width: 'calc(100% - 42px)',
                  margin: '4px 0 0 auto',
                  overflow: 'hidden',
                }}
              >
                {item.fields.content || '-'}
              </Typography>
            </Box>
          ))}
      </Stack>
    );
  };

  return (
    <BaseLayout>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Box sx={{ m: 4, display: 'flex', justifyContent: 'center' }}>
            <SearchInput />
          </Box>
          <Container maxWidth="sm" sx={{ p: 0, position: 'relative' }}>
            <ConsultationList />
          </Container>
        </>
      )}
    </BaseLayout>

  );
}
