import { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Stack, MenuItem } from '@mui/material';
import { postData } from '../utils/postData';
import { BaseLayout } from '../components/BaseLayout';
import { SubTitleStyle, ButtonStyle } from '../styles';
import ColorPalette from './components/Colors';
import ClothesStyles from './components/ClothesStyles';
import PatternStyles from './components/PatternStyles';
import { GENDER } from '../constants';

export default function Diagnosis() {
  const [age, setAge] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [frame, setFrame] = useState(0);
  const [selectedColors, setSelectedColors] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedPattern, setSelectedPattern] = useState('');

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

  const handleNext = () => frame < 4 && setFrame(frame + 1);

  // useEffect(() => {
  //   if (selectedStyle) {
  //     // const fetchDefaultImages = async () => {
  //     //   try {
  //     //     const payload = `Generate  ${selectedStyle} style outfits
  //     //     for a ${age} years old ${gender} child
  //     //     in these color shades ${selectedColors}`;
  //     //     const result = await postData(payload, 'getImagesAI');
  //     //     setAiImages(result);
  //     //     console.log('DATA', result);
  //     //   } catch (error) {
  //     //     console.error('Error fetching default images:', error);
  //     //   }
  //     };
  //   }
  // }, [age, gender, selectedStyle]);

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
            </>
          )}
          {frame === 3 && (
            <>
              <Typography>好きなものを選んでね</Typography>
              <PatternStyles selectedPattern={selectedPattern} setSelectedPattern={setSelectedPattern} />
            </>
          )}
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
            つぎへ
          </Button>
        </Stack>
      </Stack>
    </BaseLayout>
  );
}
