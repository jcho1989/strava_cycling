import {AppShell, Button} from '@mantine/core';

import AuthorizedApp from '../AuthorizedApp/AuthorizedApp';

import useAuthStore from '../../store/useAuthStore';

export default function BasePage() {
  
  const {isLoggedIn, isLoading, initiateStravaAuth} = useAuthStore();

  const handleLogin = () => {
    initiateStravaAuth();
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
            <AuthorizedApp/>
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