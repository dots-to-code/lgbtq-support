import { BaseLayout } from '../components/BaseLayout';
import { SubTitleStyle } from '../styles';

export default function Information() {
  return (
    <BaseLayout>
      <h1 style={{ alignSelf: 'center', ...SubTitleStyle }}>Information</h1>
    </BaseLayout>
  );
}
