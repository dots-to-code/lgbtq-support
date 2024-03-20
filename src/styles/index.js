export const ButtonStyle = {
  color: 'white',
  border: 'none',
  borderRadius: '30px',
  backgroundColor: '#EB6159',
  height: '60px',
  width: '265px',
  margin: '0 auto',
  fontSize: '1rem',
};

const TitleCommon = {
  fontFamily: '"Bungee", sans-serif',
  textTransform: 'uppercase',
  color: '#EB6159',
  fontWeight: 900,
};

export const TitleStyle = {
  ...TitleCommon,
  fontSize: '80px',
  fontWeight: 900,
  textShadow: '5px 5px 0 #847c7c',
  lineHeight: 0.9,
};

export const SubTitleStyle = {
  ...TitleCommon,
  fontSize: '30px',
  textShadow: '2px 2px 0 #847c7c',
};
