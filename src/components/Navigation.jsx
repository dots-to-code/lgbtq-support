import * as React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

function refreshMessages() {
  const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

  return Array.from(new Array(50)).map(() => messageExamples[getRandomInt(messageExamples.length)]);
}

export default function FixedBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);
  const [messages, setMessages] = React.useState(() => refreshMessages());

  React.useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
    setMessages(refreshMessages());
  }, [value, setMessages]);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <List>
        {messages.map(({ primary, secondary, person }, index) => (
          <ListItemButton key={index + person}>
            <ListItemAvatar>
              <Avatar alt="Profile Picture" src={person} />
            </ListItemAvatar>
            <ListItemText primary={primary} secondary={secondary} />
          </ListItemButton>
        ))}
      </List>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <Link to="/information" style={{ alignSelf: 'center' }}>
            <BottomNavigationAction label="ひろば" showLabel icon={<QuestionAnswerRoundedIcon />} />
          </Link>
          <Link to="/consultation" style={{ alignSelf: 'center' }}>
            <BottomNavigationAction label="よみもの" showLabel icon={<MenuBookRoundedIcon />} />
          </Link>
          <Link to="/diagnosis" style={{ alignSelf: 'center' }}>
            <BottomNavigationAction label="お知らせ" showLabel icon={<NotificationsNoneRoundedIcon />} />
          </Link>
          <Link to="/diagnosis" style={{ alignSelf: 'center' }}>
            <BottomNavigationAction label="メニュー" showLabel icon={<SentimentSatisfiedRoundedIcon />} />
          </Link>
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

const messageExamples = [
  {
    primary: '今週ブランチに行こうか？',
    secondary: '今週、近所にいる予定です。一緒に食事をしましょう。',
    person: '/src/assets/cats.png',
  },
  {
    primary: '誕生日プレゼント',
    secondary: `ジョンの仕事の記念日に良いプレゼントの提案はありますか？私は本当に迷っています。あなたの考えを聞きたいです。`,
    person: '/src/assets/cats.png',
  },
  {
    primary: '試してみるレシピ',
    secondary: '新しいバーベキューのレシピを試しています。これは素晴らしいと思います。',
    person: '/src/assets/cats.png',
  },
  {
    primary: 'はい！',
    secondary: '今年のReactConfのチケットを持っています。',
    person: '/src/assets/cats.png',
  },
  {
    primary: '医者の予約',
    secondary: '私の医者への予約が来週の土曜日に変更されました。',
    person: '/src/assets/cats.png',
  },
  {
    primary: '議論',
    secondary: `ボトムアプリバー（下部ナビゲーションドロワーやオーバーフローメニューなど）によって生成されたメニューは、バーのより高い位置でボトムシートとして開きます。`,
    person: '/src/assets/cats.png',
  },
  {
    primary: '夏のバーベキュー',
    secondary: `誰が今週末にバーベキューをしませんか？私は裏庭に新しい家具を手に入れたので、グリルを使って料理をしたいと思います。`,
    person: '/src/assets/cats.png',
  },
];
