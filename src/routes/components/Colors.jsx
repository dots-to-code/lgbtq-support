import { Box } from '@mui/material';

export const colorStyles = [
  {
    value: 'pale',
    imageUrl: '/assets/colors/pale.jpg',
  },
  {
    value: 'blue',
    imageUrl: '/assets/colors/blue.png',
  },
  {
    value: 'bright',
    imageUrl: '/assets/colors/bright.jpg',
  },
  {
    value: 'vivid',
    imageUrl: '/assets/colors/vivid.jpg',
  },
  {
    value: 'dark',
    imageUrl: '/assets/colors/dark.jpg',
  },
  {
    value: 'deep',
    imageUrl: '/assets/colors/deep.jpg',
  },
];

const ColorPalette = ({ selectedColors, setSelectedColors }) => {
  const handleColorClick = (pattern) => {
    setSelectedColors(pattern);
  };

  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridTemplateRows: 'repeat(3, auto)',
          gap: '12px',
          margin: '12px',
        }}
      >
        {colorStyles.length &&
          colorStyles.map((color, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box
                sx={{
                  borderRadius: '8px',
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                  border: selectedColors === color.value ? '2px solid #EB6159' : '2px solid transparent',
                }}
              >
                <img
                  src={color.imageUrl || ''}
                  style={{
                    justifyContent: 'flex-end',
                    height: '150px',
                    borderRadius: '8px',
                    width: '150px',
                  }}
                  onClick={() => handleColorClick(color.value)}
                  alt={color.value}
                />
              </Box>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ColorPalette;
