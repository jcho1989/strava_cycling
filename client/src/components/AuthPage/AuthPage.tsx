import { useEffect } from 'react';
import { AppShell, Badge, Button, Card, Flex, Group, Image, Text } from '@mantine/core';

import useAuth from '../../hooks/useAuth';
import AuthorizedApp from '../AuthorizedApp/AuthorizedApp';

export default function AuthPage() {
  const { isLoggedIn, isLoading, initiateStravaAuth } = useAuth();

  const handleLogin = () => {
    initiateStravaAuth();
  };

  useEffect(() => {
    // Optional: Check for existing session or tokens on mount
    const storedAccessToken = localStorage.getItem('stravaAccessToken');
    if (storedAccessToken) {
      // Here, you could potentially set state to reflect that the user is logged in
    }
  }, []);

  return (
    <AppShell padding="md">
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
            <AuthorizedApp />
          ) : (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image
                  src="https://cdn6.aptoide.com/imgs/1/e/5/1e5340aa698a455893680365fcb46955_fgraphic.png"
                  height={160}
                  alt="Strava Segments"
                />
              </Card.Section>
              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={900}>STRAVA SEGMENTS</Text>
                <Badge color="blue">HELL YEAH</Badge>
              </Group>
              <Text size="sm" c="dimmed">
                <span>Strava test app to do something with segments.</span>
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
