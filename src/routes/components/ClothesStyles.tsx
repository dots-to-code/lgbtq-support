import React from 'react';
import { Box, Typography } from '@mui/material';

export const clothingStyles = [
  {
    name: 'きれいめ',
    value: 'beautiful',
    imageUrl: '/assets/clothes/beautiful.png',
  },
  {
    name: 'カジュアル',
    value: 'casual',
    imageUrl: '/assets/clothes/casual.png',
  },
  {
    name: 'モード',
    value: 'mode',
    imageUrl: '/assets/clothes/mode.png',
  },
  {
    name: 'ガーリー',
    value: 'girly',
    imageUrl: '/assets/clothes/girly.png',
  },
  {
    name: 'ナチュラル',
    value: 'natural',
    imageUrl: '/assets/clothes/natural.png',
  },
  {
    name: '原宿',
    value: 'harajuku',
    imageUrl: '/assets/clothes/harajuku.png',
  },
];

const ClothingStyles = ({ selectedStyle, setSelectedStyle }) => {
  const handleStyleClick = (style) => {
    setSelectedStyle(style);
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
        {clothingStyles.length &&
          clothingStyles.map((style, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box
                sx={{
                  borderRadius: '8px',
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                  border: selectedStyle === style.value ? '2px solid #EB6159' : '2px solid transparent',
                }}
              >
                <img
                  src={style.imageUrl || ''}
                  style={{
                    justifyContent: 'flex-end',
                    height: '150px',
                    borderRadius: '8px',
                    width: '150px',
                  }}
                  onClick={() => handleStyleClick(style.value)}
                  alt={style.name}
                />
              </Box>
              <Typography>{style.name}</Typography>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ClothingStyles;
