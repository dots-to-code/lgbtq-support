import LogoutButton from '../components/LogoutButton';
import { BaseLayout } from '../components/BaseLayout';

export default function Settings() {
  return (
    <BaseLayout>
      <h1>Settings</h1>
      <LogoutButton />
    </BaseLayout>
  );
}
