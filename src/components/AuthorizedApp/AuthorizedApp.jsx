import {useNavigate} from 'react-router-dom';

import {AppShell} from '@mantine/core';

import useAuthStore from '../../store/useAuthStore';

import AthleteDetails from '../AthleteDetails/AthleteDetails';

export default function AuthorizedApp() {
  
  // const {logout} = useAuthStore();
  // const navigate = useNavigate();
  
  // const handleLogout = () => {
  //   logout();
  //   navigate('/');
  // };

  return (
    <AppShell
      header={{ height: 60 }}
      padding="md"
    >
      <AppShell.Main>
        <AthleteDetails/>
        {/* <Grid>
          <Grid.Col span={4}>
            <Button onClick={handleLogout}>
              Logout
            </Button>
          </Grid.Col>
        </Grid> */}
      </AppShell.Main>
    </AppShell>
  );
}