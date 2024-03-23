import { Box } from '@mui/material';

const patternStyles = [
  {
    value: 'cotton',
    imageUrl: '/assets/patterns/cotton.png',
  },
  {
    value: 'blooms',
    imageUrl: '/assets/patterns/blooms.png',
  },
  {
    value: 'boats',
    imageUrl: '/assets/patterns/boats.png',
  },
  {
    value: 'checkered',
    imageUrl: '/assets/patterns/checkered.png',
  },
  {
    value: 'flowers',
    imageUrl: '/assets/patterns/flowers.png',
  },
  {
    value: 'horizontal stripes',
    imageUrl: '/assets/patterns/horizontalStripes.png',
  },
  {
    value: 'dots',
    imageUrl: '/assets/patterns/dots.png',
  },
  {
    value: 'yellow horizontal stripes',
    imageUrl: '/assets/patterns/horizontalStripesYellow.png',
  },
  {
    value: 'summery',
    imageUrl: '/assets/patterns/summer.png',
  },
  {
    value: 'tartan',
    imageUrl: '/assets/patterns/tartan.png',
  },
  {
    value: 'valentines',
    imageUrl: '/assets/patterns/valentines.png',
  },
  {
    value: 'vertical stripes',
    imageUrl: '/assets/patterns/verticalStripes.png',
  },
];

const PatternStyles = ({ selectedPattern, setSelectedPattern }) => {
  const handlePatternClick = (pattern) => {
    setSelectedPattern(pattern);
  };

  const selectedPatternURL =
    (patternStyles.find((p) => p.value === selectedPattern) &&
      patternStyles.find((p) => p.value === selectedPattern).imageUrl) ||
    'none';

  return (
    <div>
      <div
        style={{
          width: '100px',
          height: '100px',
          margin: '0 auto',
          backgroundImage: `url(${selectedPatternURL})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: '1px solid #000',
          borderRadius: '8px',
        }}
      ></div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(3, auto)',
          gap: '12px',
          margin: '12px',
        }}
      >
        {patternStyles.length &&
          patternStyles.map((pattern, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box
                sx={{
                  borderRadius: '8px',
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                  border: selectedPattern === pattern.value ? '2px solid #EB6159' : '2px solid transparent',
                }}
              >
                <img
                  src={pattern.imageUrl || ''}
                  style={{
                    justifyContent: 'flex-end',
                    height: '80px',
                    borderRadius: '8px',
                    width: '80px',
                  }}
                  onClick={() => handlePatternClick(pattern.value)}
                  alt={pattern.value}
                />
              </Box>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PatternStyles;
