import {AppShell, Badge, Button, Card, Flex, Group, Image, Text} from '@mantine/core';

import AuthorizedApp from '../AuthorizedApp/AuthorizedApp';

import useAuthStore from '../../store/useAuthStore';

export default function AuthPage() {
  
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
                src="https://cdn6.aptoide.com/imgs/1/e/5/1e5340aa698a455893680365fcb46955_fgraphic.png"
                height={160}
                alt="Norway"
              />
            </Card.Section>
            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={900}>STRAVA SEGMENTS</Text>
              <Badge color="blue">HELL YEAH</Badge>
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