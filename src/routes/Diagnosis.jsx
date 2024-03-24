import { useState } from 'react';
import { TextField, Button, Typography, Stack } from '@mui/material';
import { postPrompt } from '../utils/postPrompt';
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
        const result = await postPrompt({ prompt }, 'getImagesAI');
        setAiImages(result.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching default images:', error);
        setAiImages([
          // {
          //   revised_prompt:
          //     'Create an image of a child, about 7 years old, decked out in Harajuku style fashion. The clothing should be in pale, soothing colors - think pastels like light pink, baby blue, mint green, and soft lavender. The outfit could include frilly skirts, oversized bows, knee-high socks, lace-trimmed cardigans, and other cute, whimsical elements characteristic of Harajuku style. The child should appear happy and confident, embracing the playful and imaginative spirit of this distinctive street fashion style. Remember to include a variety of textures and patterns, from furs to polka dots, for added visual interest.',
          //   url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-Itu6A6q1sfgadrTzrb41aHCm/user-ms47bQMLzXS6ptoY5G1EXX6h/img-MheDRWEQ8B7NDsku2qR0PXKx.png?st=2024-03-24T11%3A54%3A47Z&se=2024-03-24T13%3A54%3A47Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-23T21%3A19%3A44Z&ske=2024-03-24T21%3A19%3A44Z&sks=b&skv=2021-08-06&sig=K9A6QjJe/bzz0dFZZLFN9U7gYIZnzQiBouAlS6AFDLU%3D',
          // },
          // {
          //   revised_prompt:
          //     'Generate an image showcasing different beautiful outfit ideas for a 4-year-old child, predominantly featuring various shades of blue. The outfits should be aspiring, covering all seasons, and include details such as jackets, dresses, hats, scarves, shoes, and socks. The clothing pieces should demonstrate a mix of textures, patterns, and designs, and should be styled in an aesthetic way to evoke a sense of inspiration. The backdrop could be a minimalist, neutral tone to keep the focus on the outfits.',
          //   url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-Itu6A6q1sfgadrTzrb41aHCm/user-ms47bQMLzXS6ptoY5G1EXX6h/img-mQ19vTdvp6fjy6B0Tt6lC3s7.png?st=2024-03-24T11%3A01%3A58Z&se=2024-03-24T13%3A01%3A58Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-23T21%3A06%3A53Z&ske=2024-03-24T21%3A06%3A53Z&sks=b&skv=2021-08-06&sig=Dcr6UuV3astfsUe3WxTjBMmjMfmTOwzuzgg676Xoffw%3D',
          // },
          // {
          //   revised_prompt:
          //     "Imagine an array of various natural style outfits designed for a 6-year-old child. These outfits should predominantly feature pale colors. They may include items like light cotton tunics, linen trousers, soft knit sweaters, and comfortable footwear. Each outfit should not only be functional but also designed with a touch of playfulness to appeal to a child's sense of fun. Picture these outfits neatly arranged in a pastel-colored room with soft lighting.",
          //   url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-Itu6A6q1sfgadrTzrb41aHCm/user-ms47bQMLzXS6ptoY5G1EXX6h/img-8Ld4d95Eu1nuS9fKcnJVhgx2.png?st=2024-03-24T10%3A59%3A20Z&se=2024-03-24T12%3A59%3A20Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-23T21%3A32%3A37Z&ske=2024-03-24T21%3A32%3A37Z&sks=b&skv=2021-08-06&sig=lNwfsoBZYNO6lK8GBEwY311FMUvsU%2BBLoNBB50zP1Bw%3D',
          // },
          // {
          //   revised_prompt:
          //     'Imagine a stylish wardrobe collection for a 7-year-old child. This repertoire includes soft, pastel-colored outfits that exhibit feminine charm. Visualize beautiful dresses with flowery patterns, light ruffles, and ribbons adorning them. The assortment also consists of an adorable hat, bloomers, and matching footwear, all curated with the same delicate color palette. Picture these clothes neatly displayed against a white background, highlighting their intricate details, texture, and aesthetic appeal.',
          //   url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-Itu6A6q1sfgadrTzrb41aHCm/user-ms47bQMLzXS6ptoY5G1EXX6h/img-aCfmqVTIB0OULI7uKUdWqoz9.png?st=2024-03-24T10%3A53%3A07Z&se=2024-03-24T12%3A53%3A07Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-23T23%3A26%3A36Z&ske=2024-03-24T23%3A26%3A36Z&sks=b&skv=2021-08-06&sig=Z%2Bp1XGoSJDDqW8BUroSfrdq/JCBLdbr4zNPRKwlgPg4%3D',
          // },
          // {
          //   revised_prompt:
          //     'Imagine a collection of feminine-styled outfits suitable for a 16-year-old individual. The clothes should be primarily in soft, pale colors, like pastels. The set could include items such as lightweight sweaters, ruffled skirts, floral printed dresses, and comfortable shoes. Accessories might involve, for instance, patterned headbands, delicate bracelets, and small, classy handbags. The fabrics used are noticeably soft and have a graceful flow to them. Aesthetics of the elements should communicate youthfulness, sophistication, and charm.',
          //   url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-Itu6A6q1sfgadrTzrb41aHCm/user-ms47bQMLzXS6ptoY5G1EXX6h/img-VNuvm1hLbajKPRLcQORWViM7.png?st=2024-03-24T10%3A41%3A30Z&se=2024-03-24T12%3A41%3A30Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-23T21%3A12%3A51Z&ske=2024-03-24T21%3A12%3A51Z&sks=b&skv=2021-08-06&sig=WEKgFNd829CtAzKjP/zUjo7Ui8GW/dg8UqkxT%2Bnw31M%3D',
          // },
          // {
          //   revised_prompt:
          //     'Create an image showcasing a diverse range of stylish outfits suited for a 6-year-old child. All of these outfits should be designed in subtle, pale colors that allow for a mild and calming aesthetic. These looks could range from casual to formal to adventurous, always keeping the comfort and appeal to a child in mind.',
          //   url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-Itu6A6q1sfgadrTzrb41aHCm/user-ms47bQMLzXS6ptoY5G1EXX6h/img-mZzQlrktHnSHp1yWCFHoPy2S.png?st=2024-03-24T10%3A22%3A03Z&se=2024-03-24T12%3A22%3A03Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-23T21%3A26%3A23Z&ske=2024-03-24T21%3A26%3A23Z&sks=b&skv=2021-08-06&sig=Ib2%2BDKyVUXhBwfUsiNdiC9QFomUaOzkc2/CSm9pq0KA%3D',
          // },
          // {
          //   revised_prompt:
          //     'Generate an image displaying a range of trendy and fashionable outfits, suitable for an 18 year old individual. Concentrate on designs that utilize dark colors such as black, grey, or deep navy. Display this array of outfits with a variety of different clothing pieces, like jackets, jeans, skirts, shoes, and accessories, showcasing the many ways one can stylishly use dark colors.',
          //   url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-Itu6A6q1sfgadrTzrb41aHCm/user-ms47bQMLzXS6ptoY5G1EXX6h/img-MPfTJMkaahJtFTTnDSrg9irs.png?st=2024-03-24T10%3A30%3A50Z&se=2024-03-24T12%3A30%3A50Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-23T18%3A46%3A00Z&ske=2024-03-24T18%3A46%3A00Z&sks=b&skv=2021-08-06&sig=tQv21s512YpGJ76fHIHu7q1AaeKndhpFGe/h39/E6iA%3D',
          // },
          {
            url: '/assets/mocks/mock1.png',
          },
          {
            url: '/assets/mocks/mock2.png',
          },
          {
            url: '/assets/mocks/mock3.png',
          },
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
                        width: '320px',
                        borderRadius: '8px',
                      }}
                      alt="ai generated image of outfits"
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
