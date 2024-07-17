import {useNavigate} from 'react-router-dom';

import {AppShell, Button, Grid} from '@mantine/core';

import useAuthStore from '../../store/useAuthStore';

import AthleteDetails from '../AthleteDetails/AthleteDetails';

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
        <AthleteDetails/>
        <br/>
        <Grid>
          <Grid.Col span={12}>
            <Button onClick={handleLogout}>
              Logout
            </Button>
          </Grid.Col>
        </Grid>
      </AppShell.Main>
    </AppShell>
  );
}