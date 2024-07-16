import {useNavigate} from 'react-router-dom';

import {AppShell, Button} from '@mantine/core';

import useAuthStore from '../../store/useAuthStore';

export default function AuthorizedApp() {
  
  const {logout} = useAuthStore();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppShell
      header={{ height: 60 }}
      padding="md"
    >
      <AppShell.Main>
        <div>
          <p>Authenticated</p>
        </div>
        <Button onClick={handleLogout}>
          Logout
        </Button>
      </AppShell.Main>
    </AppShell>
  );
}