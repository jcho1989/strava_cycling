import {AppShell, Button} from '@mantine/core';

import { useNavigate } from 'react-router-dom';

import useAuthStore from '../../store/auth';

export default function BasePage() {
  console.log('BasePage');
  
  const { isLoggedIn, isLoading, initiateStravaAuth, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = () => {
    initiateStravaAuth();
  };

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
          {isLoading ? (
            <p>Authenticating... Please wait</p>
          ) : isLoggedIn ? (
            <div>
              <p>Logged in</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <Button onClick={handleLogin}>
              Authenticate with Strava
            </Button>
        )}
      </div>
      </AppShell.Main>
    </AppShell>
  );
}