import {useNavigate} from 'react-router-dom';

import {AppShell, Burger, Button, Grid, Group} from '@mantine/core';

import useAuthStore from '../../store/useAuthStore';

import ActivitiesList from '../ActivitiesList/ActivitiesList';
import {useDisclosure} from '@mantine/hooks';

export default function AuthorizedApp() {
  const [opened, { toggle }] = useDisclosure();

  const {logout} = useAuthStore();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding={0}
    >

      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Button onClick={handleLogout}>Logout</Button>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

      {/* TODO: fix styles */}
      <AppShell.Main w={800} p={0}>
        <Grid grow={true}>
          <Grid.Col span={24}>
              <ActivitiesList/>
              {/* <AthleteDetails/> */}
            </Grid.Col>
        </Grid>
      </AppShell.Main>
    </AppShell>
  );
}


