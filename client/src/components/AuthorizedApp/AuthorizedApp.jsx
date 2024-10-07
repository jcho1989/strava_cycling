import {AppShell, Grid} from '@mantine/core';

import ActivitiesList from '../ActivitiesList/ActivitiesList';
import Header from '../Header/Header';
import useAuthenticatedAthlete from '../../hooks/services/athletes/useAuthenticatedAthlete';

export default function AuthorizedApp() {
  const {results: athlete, loading} = useAuthenticatedAthlete();
  console.log('athlete', athlete);
  console.log('loading', loading);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm'
      }}
      padding={0}
    >
      {athlete && <Header athlete={athlete}/>}

      <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

      <AppShell.Main w={800} p={0}>
        <Grid grow={true}>
          <Grid.Col span={24}>
              <ActivitiesList/>
            </Grid.Col>
        </Grid>
      </AppShell.Main>
    </AppShell>
  );
}
