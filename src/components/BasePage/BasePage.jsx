import {AppShell, Badge, Button, Card, Flex, Group, Image, Text} from '@mantine/core';

import AuthorizedApp from '../AuthorizedApp/AuthorizedApp';

import useAuthStore from '../../store/useAuthStore';

export default function BasePage() {
  
  const {isLoggedIn, isLoading, initiateStravaAuth} = useAuthStore();

  const handleLogin = () => {
    initiateStravaAuth();
  };


  return (
    <AppShell
      padding="md"
    >
      <AppShell.Main>
        <Flex
        style={{ height: '100vh' }} // Ensure the flex container takes the full height of the viewport
        direction="column"
        align="center"
        justify="center"
      >

          {isLoading ? (
            <p>Authenticating... Please wait</p>
          ) : isLoggedIn ? (
            <AuthorizedApp/>
          ) : (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
              <Image
                src="https://i0.wp.com/www.nfrcycling.com/wp-content/uploads/2020/10/strava-club.jpg"
                height={160}
                alt="Norway"
              />
            </Card.Section>
      
            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>Strava Segments</Text>
              <Badge color="pink">HELL YEAH</Badge>
            </Group>
      
            <Text size="sm" c="dimmed">
              <span>Strava test app to do something with segments I think.</span>
            </Text>
      
            <Button color="blue" fullWidth mt="md" radius="md" onClick={handleLogin}>
              Authenticate with Strava
            </Button>
          </Card>
          )}

      </Flex>
      </AppShell.Main>
    </AppShell>
  );
}