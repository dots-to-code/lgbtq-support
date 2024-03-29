import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useAuth0 } from '@auth0/auth0-react';
import { getData } from '../utils/getData';
import { postData } from '../utils/postData';
import { BaseLayout } from '../components/BaseLayout';
import { Container, Stack, ListItemText, Typography, Button, Box } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { GENDER } from '../constants';
import { useNavigate } from 'react-router-dom';
import { SearchInput } from '../components/SearchInput';
import Loading from '../components/Loading';
import { usersListState, consultationsState } from '../state';

export default function Consultation() {
  const { user } = useAuth0();
  const [users, setUsers] = useRecoilState(usersListState);
  const [consultations, setConsultations] = useRecoilState(consultationsState);
  const [loading, setIsLoading] = useState(false);
  const [list, setList] = useState();

  if (!users) <Loading />;

  useEffect(() => {
    setIsLoading(true);

    const registerUserAndGetData = async () => {
      const loggedUser = {
        records: [
          {
            fields: {
              name: user.name,
              email: user.email,
              picture: user.picture,
            },
          },
        ],
      };

      (async () => {
        try {
          const usersRes = await getData('getusers');
          setUsers(usersRes);
          // If user logs in for first time, register them in airtable too
          if (!usersRes.find((user) => user.fields.email === user.email)) {
            await postData(loggedUser, 'postNewUser');
          }

          const usersMap = [];
          usersRes.forEach((user) => {
            usersMap[user.id] = user;
          });

          const consultationList = await getData('getconsultations');
          consultationList.sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime));
          setConsultations(consultationList);

          const list = consultationList.map((consultation) => {
            const userId = consultation.fields.user_id[0];
            const user = usersMap[userId];
            return {
              ...consultation,
              user: user,
            };
          });

          setList(list);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          console.error('An error occurred:', error);
        }
      })();
    };

    registerUserAndGetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

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

  const ButtonStyle = {
    position: 'fixed',
    bottom: '75px',
    right: '10px',
    height: '54px',
    borderRadius: '16px',
    backgroundColor: '#EB6159',
    '&::after': {
      content: '""',
      position: 'absolute',
      margin: 0,
      bottom: '-16px',
      left: '16px',
      width: 0,
      height: 0,
      borderTop: '30px solid #EB6159',
      borderLeft: '12px solid transparent',
      borderRight: '12px solid transparent',
      transform: 'rotate(35deg)',
      zIndex: '-1',
    },
    '&:hover': {
      backgroundColor: '#EB6159',
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
        {list &&
          list.map((item) => (
            <Box key={`box-${item.id}`} sx={ListItemStyle} onClick={handleClickDetail(item)}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {item.user.fields?.picture ? (
                  <img
                    style={{ borderRadius: '50%', width: '30px', height: '30px', marginRight: '8px' }}
                    alt="user profile"
                    src={item.user.fields?.picture}
                  />
                ) : (
                  <AccountCircleRoundedIcon fontSize={'large'} sx={{ color: '#393532', mr: 1 }} />
                )}
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

  const handlePost = () => {
    navigate('/consultation/post');
  };

  return (
    <BaseLayout>
      <Box sx={{ m: 4, display: 'flex', justifyContent: 'center' }}>
        <SearchInput />
      </Box>
      <Container maxWidth="sm" sx={{ p: 0, position: 'relative' }}>
        <ConsultationList />
        <Button sx={ButtonStyle} variant="contained" onClick={handlePost}>
          相談する
        </Button>
      </Container>
    </BaseLayout>
  );
}
