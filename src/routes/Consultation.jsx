import { BaseLayout } from '../components/BaseLayout';
import { Container, List, ListItem, ListItemText, Typography, Button } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { GENDER } from '../constants';
import { useNavigate } from 'react-router-dom';

export default function Consultation() {
  const navigate = useNavigate();
  const datas = [
    {
      id: 1,
      name: '1コウテイペンギン',
      content:
        '相談内容が入ります相談内容が入ります相談内容が入ります相談内容が入ります相談内容が入ります相談内容が入ります相談内容が入ります相談内容が入ります相談内容が入ります相談内容が入ります相談内容が入ります相談内容が入ります相談内容が入ります相談内容が入ります相談内容が入ります相談内容が入ります',
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
    },
    {
      id: 2,
      name: '2コウテイペンギン',
      content: '相談内容が入ります相談内容が入ります相談内容が入ります相談内容が入ります',
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
      content: '相談内容が入ります相談内容が入ります相談内容が入ります相談内容が入ります',
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
      content: '相談内容が入ります相談内容が入ります相談内容が入ります相談内容が入ります',
      children: [
        {
          id: 3,
          birthday: '2008-03-16',
          gender: 'UNKNOWN',
        },
      ],
    },
  ];

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

  const ConsultationList = ({ list }) => {
    const displayChilden = (children) => {
      return children.map((child, index) => {
        const birthday = new Date(child.birthday);
        const today = new Date();
        const age = today.getFullYear() - birthday.getFullYear();

        return `${age}さい ${GENDER[child.gender]}${children.length - 1 > index ? ' / ' : ''}`;
      });
    };

    const handleClickDetail = (id) => () => {
      navigate(`/consultation/${id}`);
    };

    return (
      <List sx={{ width: '100%', maxWidth: 850 }}>
        {list.map((item) => (
          <>
            <ListItem key={item.id} sx={ListItemStyle} onClick={handleClickDetail(item.id)}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <AccountCircleRoundedIcon fontSize={'large'} sx={{ color: '#393532', mr: 1 }} />
                <ListItemText
                  primary={item.name}
                  secondary={
                    <>
                      <Typography sx={{ fontSize: '10px' }}>{displayChilden(item.children)}</Typography>
                    </>
                  }
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
                  display: '-webkit-box',
                  '-webkit-box-orient': 'vertical',
                  '-webkit-line-clamp': '3',
                  overflow: 'hidden',
                }}
              >
                {item.content}
              </Typography>
            </ListItem>
          </>
        ))}
      </List>
    );
  };

  const handlePost = () => {
    navigate('/consultation/post');
  };

  return (
    <BaseLayout>
      <Container maxWidth="sm" sx={{ p: 0, position: 'relative' }}>
        <ConsultationList list={[].concat(datas, datas, datas, datas)} />
        <Button sx={ButtonStyle} variant="contained" onClick={handlePost}>
          相談する
        </Button>
      </Container>
    </BaseLayout>
  );
}
