import { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Stack, MenuItem } from '@mui/material';
import { postData } from '../utils/postData';
import { BaseLayout } from '../components/BaseLayout';
import { SubTitleStyle, ButtonStyle } from '../styles';
import ColorPalette from './Colors';
import ClothesStyles from './ClothesStyles';
import { GENDER } from '../constants';
import { clothingStyles } from './ClothesStyles';

export default function Diagnosis() {
  const [age, setAge] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [frame, setFrame] = useState(0);
  const [selectedColors, setSelectedColors] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');

  // DALLe images analysis
  const [aiImages, setAiImages] = useState([]);

  const border = {
    padding: '12px',
    marginTop: '12px',
    backgroundColor: 'white',
    border: '1px solid #EB6159',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '10px',
  };
  const palette = {
    ...border,
    height: '40px',
  };

  const handleNext = () => frame < 2 && setFrame(frame + 1);

  useEffect(() => {
    if (selectedStyle) {
      const fetchDefaultImages = async () => {
        try {
          const payload = `Generate  ${selectedStyle} style outfits 
          for a ${age} years old ${gender} child 
          in these color shades ${selectedColors}`;
          const result = await postData(payload, 'getImagesAI');
          setAiImages(result);
        } catch (error) {
          console.error('Error fetching default images:', error);
        }
      };

      fetchDefaultImages();
    }
  }, [age, gender, selectedStyle]);

  return (
    <BaseLayout>
      <Stack sx={{ alignItems: 'center', textAlign: 'center', width: '335px', margin: 'auto' }}>
        <h1 style={{ alignSelf: 'center', ...SubTitleStyle }}>{name ? `${name}さんの好きな服` : '好きな服診断'}</h1>
        <Stack sx={{ height: '60vh' }}>
          {frame === 0 && (
            <>
              <TextField
                variant="standard"
                sx={palette}
                value={age}
                InputProps={{
                  disableUnderline: true,
                }}
                placeholder="子供の歳"
                type="number"
                min={0}
                max={18}
                onWheel={() => document.activeElement.blur()}
                onChange={(e) => setAge(e.target.value)}
              />
              <TextField
                variant="standard"
                sx={palette}
                value={name}
                InputProps={{
                  disableUnderline: true,
                }}
                placeholder="ニックネーム"
                type="text"
                onWheel={() => document.activeElement.blur()}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                select
                fullWidth
                placeholder="性別"
                variant="standard"
                value={gender}
                style={palette}
                InputProps={{
                  disableUnderline: true,
                }}
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value="MALE">{GENDER['MALE']}</MenuItem>
                <MenuItem value="FEMALE">{GENDER['FEMALE']}</MenuItem>
                <MenuItem value="UNKNOWN">{GENDER['UNKNOWN']}</MenuItem>
              </TextField>
            </>
          )}
          {frame === 1 && (
            <>
              <Typography>好きないろを選んでね</Typography>
              <ColorPalette selectedColors={selectedColors} setSelectedColors={setSelectedColors} />
            </>
          )}
          {frame === 2 && (
            <>
              <Typography>好きなものを選んでね</Typography>
              <ClothesStyles selectedStyle={selectedStyle} setSelectedStyle={setSelectedStyle} />
              {aiImages.length && (
                <div>
                  <h2>AIがおすすめする服</h2>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '12px',
                      justifyContent: 'center',
                      margin: '12px',
                    }}
                  >
                    {aiImages.map((imageUrl, index) => (
                      <Box
                        key={index}
                        sx={{
                          padding: '12px',
                          display: 'flex',
                          flexDirection: 'column',
                          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                          backgroundColor: 'white',
                          borderRadius: '8px',
                          border:
                            selectedStyle === clothingStyles[index].name
                              ? '2px solid #EB6159'
                              : '2px solid transparent',
                          transition: 'transform 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'translateY(-3px)',
                          },
                        }}
                        onClick={() => setSelectedStyle(clothingStyles[index].name)}
                      >
                        <h3>{clothingStyles[index].name}</h3>
                        <img
                          src={imageUrl}
                          alt={clothingStyles[index].name}
                          style={{ width: '200px', height: '200px' }}
                        />
                      </Box>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </Stack>
        <Button
          style={{
            ...ButtonStyle,
            marginTop: '12px',
            '&:hover': {
              cursor: 'pointer !important',
              backgroundColor: '#EB6159',
            },
            position: 'fixed',
            bottom: '90px',
          }}
          disabled={(frame === 0) & (!age || !name) || (frame === 1 && !selectedColors.length)}
          onClick={handleNext}
        >
          つぎへ
        </Button>
      </Stack>
    </BaseLayout>
  );
}
