import { Box } from '@mui/material';

const ColorPalette = ({ selectedColors, setSelectedColors }) => {
  const generateShades = (baseColor) => {
    const shades = [];
    const increments = [0.15, 0.2, 0.4, 0.6, 0.8, 0.9];
    for (const increment of increments) {
      const shade = shadeColor(baseColor, increment);
      shades.push(shade);
    }
    return shades;
  };

  const shadeColor = (color, percent) => {
    const f = parseInt(color.slice(1), 16);
    const t = percent < 0 ? 0 : 255;
    const p = percent < 0 ? percent * -1 : percent;
    const R = f >> 16;
    const G = (f >> 8) & 0x00ff;
    const B = f & 0x0000ff;
    return `#${(
      0x1000000 +
      (Math.round((t - R) * p) + R) * 0x10000 +
      (Math.round((t - G) * p) + G) * 0x100 +
      (Math.round((t - B) * p) + B)
    )
      .toString(16)
      .slice(1)}`;
  };

  const baseColors = ['#FF5733', '#FFC300', '#C70039', '#900C3F', '#581845', '#2ECC71'];

  const handleGroupClick = (color) => {
    const shades = generateShades(color);
    const selectedGroup = shades.concat(color).join(',');
    setSelectedColors(selectedGroup);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px',
        justifyContent: 'center',
        margin: '12px',
      }}
    >
      {baseColors.map((baseColor, index) => {
        const shades = generateShades(baseColor);
        const halfLength = Math.ceil(shades.length / 2);
        const firstRowShades = shades.slice(0, halfLength);
        const secondRowShades = shades.slice(halfLength);

        return (
          <Box
            key={index}
            sx={{
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: selectedColors.includes(baseColor) ? '2px solid #EB6159' : '2px solid transparent',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-3px)',
              },
            }}
            onClick={() => handleGroupClick(baseColor)}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: '10px' }}>
                {firstRowShades.map((shade, shadeIndex) => (
                  <div
                    key={shadeIndex}
                    style={{
                      width: '15px',
                      height: '15px',
                      backgroundColor: shade,
                      borderRadius: '50%',
                      marginRight: '10px',
                    }}
                  ></div>
                ))}
              </div>
              <div style={{ width: '25px', height: '25px', backgroundColor: baseColor, borderRadius: '50%' }}></div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px' }}>
                {secondRowShades.map((shade, shadeIndex) => (
                  <div
                    key={shadeIndex}
                    style={{
                      width: '15px',
                      height: '15px',
                      backgroundColor: shade,
                      borderRadius: '50%',
                      marginRight: '10px',
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </Box>
        );
      })}
    </div>
  );
};

export default ColorPalette;
