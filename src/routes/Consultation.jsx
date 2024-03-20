import { useState, useEffect } from 'react';
import { getData } from '../utils/getData';
import { postNewUser } from '../utils/postNewUser';
import { BaseLayout } from '../components/BaseLayout';
import { Container, Stack, ListItemText, Typography, Button, Box } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { GENDER } from '../constants';
import { useNavigate } from 'react-router-dom';
import { SearchInput } from '../components/SearchInput';
import Loading from '../components/Loading';

export default function Consultation() {
  const [data, setData] = useState([]);

  if (!data) <Loading />;

  const fetchData = async () => {
    const airtableData = await getData('users');
    return airtableData;
  };

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData();
      setData(result);
    };
    getData();
  }, []);

  useEffect(() => {
    const newUser = {
      records: [
        {
          fields: {
            name: 'Mickey Mouse',
            email: 'mickey.mouse@gmail.com',
          },
        },
      ],
    };

    const postUser = async () => {
      const result = await postNewUser(newUser);
      console.log('RESPONSE', result);
    };
    postUser();
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
    bottom: '88px',
    right: '16px',
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

    const handleClickDetail = (id) => () => {
      navigate(`/consultation/${id}`);
    };

    return (
      <Stack sx={{ width: '100%', maxWidth: 850 }}>
        {data.map((item) => (
          <Box key={`box-${item.id}`} sx={ListItemStyle} onClick={handleClickDetail(item.id)}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <AccountCircleRoundedIcon fontSize={'large'} sx={{ color: '#393532', mr: 1 }} />
              <ListItemText
                primary={item.fields.name}
                secondary={displayChilden(JSON.parse(item.fields.children).children)}
                secondaryTypographyProps={{
                  color: '#000',
                }}
              />
            </div>
            <Typography
              sx={{
                fontSize: '12px',
                width: 'calc(100% - 42px)',
                margin: '4px 0 0 auto',
                overflow: 'hidden',
              }}
            >
              {item.fields.content}
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
