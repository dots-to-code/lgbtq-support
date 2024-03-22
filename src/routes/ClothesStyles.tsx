import React from 'react';
import { Box } from '@mui/material';

export const clothingStyles = [
  {
    name: 'アウトドアウェア',
    imageUrl:
      'https://watermark.lovepik.com/photo/20211209/large/lovepik-summer-swimsuit-cute-little-girl-playing-ocean-picture_501759520.jpg',
  },
  {
    name: 'スポーツウェア',
    imageUrl: 'https://www.shutterstock.com/image-photo/full-length-portrait-child-sportswear-600nw-155854502.jpg',
  },
  {
    name: 'パーティーウェア',
    imageUrl: 'https://cdn.fcglcdn.com/brainbees/images/products/583x720/14557414b.webp',
  },
  {
    name: 'エスニック',
    imageUrl: 'https://thumbs.dreamstime.com/b/young-girl-kimono-white-cute-japanese-wearing-background-62101031.jpg',
  },
  {
    name: 'カジュアル',
    imageUrl: 'https://images.pexels.com/photos/5560026/pexels-photo-5560026.jpeg',
  },
  {
    name: 'フォーマル',
    imageUrl: 'https://godwincharli.com/cdn/shop/products/Nath_shirt_667x.png?v=1646263542',
  },
];

const ClothingStyles = ({ selectedStyle, setSelectedStyle }) => {
  const handleStyleClick = (styleName) => {
    setSelectedStyle(styleName);
  };

  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          margin: '12px',
        }}
      >
        {clothingStyles.length &&
          clothingStyles.map((style, index) => (
            <Box
              key={index}
              sx={{
                justifyContent: 'flex-end',
                padding: '12px',
                display: 'flex',
                height: '200px',
                width: '150px',
                flexDirection: 'column',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                background: `url(${style.imageUrl || ''}) no-repeat center`,
                backgroundSize: 'contain',
                borderRadius: '8px',
                border: selectedStyle === style.name ? '2px solid #EB6159 !important' : '2px solid transparent',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-3px)',
                },
              }}
              onClick={() => handleStyleClick(style.name)}
            >
              <h3>{style.name}</h3>
            </Box>
          ))}
      </div>
    </div>
  );
};

export default ClothingStyles;
