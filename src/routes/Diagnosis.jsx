import { useState } from 'react';
import { TextField, Button, Box, Typography, Stack } from '@mui/material';
import { postData } from '../utils/postData';
import { useNavigate } from 'react-router-dom';
import { BaseLayout } from '../components/BaseLayout';
import { ButtonStyle } from '../styles';
import Loading from '../components/Loading';
import ColorPalette, { colorStyles } from './components/Colors';
import ClothesStyles, { clothingStyles } from './components/ClothesStyles';
import PatternStyles, { patternStyles } from './components/PatternStyles';

export default function Diagnosis() {
  const [age, setAge] = useState('');
  const [name, setName] = useState('');
  const [frame, setFrame] = useState(0);
  const [selectedColors, setSelectedColors] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedPattern, setSelectedPattern] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleNext = () => {
    frame < 5 && setFrame(frame + 1);
    if (frame === 4) {
      handleSubmit();
    }
  };

  const handleEnd = () => navigate('/');

  const handleSubmit = async () => {
    if (age && selectedColors && selectedStyle && selectedPattern) {
      const prompt = `I need ${selectedStyle} style outfits of a ${age} years old child in ${selectedColors} colors`;
      try {
        setLoading(true);
        const result = await postData({ prompt }, 'getImagesAI');
        setAiImages(result.images);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching default images:', error);
        setAiImages([
          { id: 'mock1', url: '/assets/mocks/mock1.png' },
          { id: 'mock2', url: '/assets/mocks/mock2.png' },
          { id: 'mock3', url: '/assets/mocks/mock3.png' },
        ]);
        setLoading(false);
      }
    }
  };

  return (
    <BaseLayout>
      <Stack sx={{ alignItems: 'center', textAlign: 'center', width: '335px', margin: 'auto' }}>
        <h1 style={{ alignSelf: 'center' }}>好きな服診断</h1>
        <Stack>
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
            </>
          )}
          {frame === 3 && (
            <>
              <Typography>好きなものを選んでね</Typography>
              <PatternStyles selectedPattern={selectedPattern} setSelectedPattern={setSelectedPattern} />
            </>
          )}
          {frame === 4 && (
            <>
              <div style={{ display: 'flex' }}>
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    margin: '0 auto',
                    backgroundImage: `url(${colorStyles.find((color) => color.value === selectedColors)?.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: '1px solid #000',
                    borderRadius: '8px',
                  }}
                ></div>
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    margin: '0 auto',
                    backgroundImage: `url(${clothingStyles.find((style) => style.value === selectedStyle)?.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: '1px solid #000',
                    borderRadius: '8px',
                  }}
                ></div>
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    margin: '0 auto',
                    backgroundImage: `url(${patternStyles.find((pattern) => pattern.value === selectedPattern)?.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: '1px solid #000',
                    borderRadius: '8px',
                  }}
                ></div>
              </div>
            </>
          )}
          {frame === 5 && (
            <>
              {loading ? (
                <Loading size={'50px'} />
              ) : aiImages.length ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  {aiImages.map((image, i) => (
                    <img
                      key={i}
                      src={image.url || ''}
                      style={{
                        marginTop: '20px',
                        height: 'auto',
                        width: '150px',
                        borderRadius: '8px',
                      }}
                      alt={image.id}
                    />
                  ))}
                  <Button
                    style={{
                      ...ButtonStyle,
                      marginTop: '12px',
                      '&:hover': {
                        cursor: 'pointer !important',
                        backgroundColor: '#EB6159',
                      },
                    }}
                    onClick={handleEnd}
                  >
                    診断をおわる
                  </Button>
                  <Button
                    style={{
                      ...ButtonStyle,
                      marginTop: '12px',
                      backgroundColor: '#F6ADA8',
                      '&:hover': {
                        cursor: 'pointer !important',
                      },
                    }}
                    onClick={() => navigate(0)}
                  >
                    もう一度診断する
                  </Button>
                </div>
              ) : null}
            </>
          )}
          {frame !== 5 && (
            <Button
              style={{
                ...ButtonStyle,
                marginTop: '12px',
                '&:hover': {
                  cursor: 'pointer !important',
                  backgroundColor: '#EB6159',
                },
              }}
              disabled={
                (frame === 0) & (!age || !name) ||
                (frame === 1 && !selectedColors.length) ||
                (frame === 2 && !selectedStyle) ||
                (frame === 3 && !selectedPattern)
              }
              onClick={handleNext}
            >
              {frame === 4 ? '送信する' : 'つぎへ'}
            </Button>
          )}
        </Stack>
      </Stack>
    </BaseLayout>
  );
}
