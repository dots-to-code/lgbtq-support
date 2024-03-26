import { BaseLayout } from '../components/BaseLayout';
import { Container } from '@mui/material';

export default function Share() {
  const iframeStyle = {
    border: 'none',
    marginTop: '20px',
    borderRadius: '12px',
    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
  };

  return (
    <BaseLayout style={{ display: 'flex', flexDirection: 'center' }}>
      <Container sx={{ p: 0, position: 'relative' }}>
        <iframe
          style={iframeStyle}
          src="https://miibo.jp/chat/9eb72e2a-48cc-462e-b0d2-f9302041f01218e70f752691fe?name=Penfam%20Bot"
          width="100%"
          height="550px"
        ></iframe>
      </Container>
    </BaseLayout>
  );
}
