import {AppShell} from '@mantine/core';


export default function AuthorizedApp() {
  console.log('AuthorizedApp');
  console.log('import.meta.env', import.meta.env)

  return (
    <AppShell
      header={{ height: 60 }}
      padding="md"
    >
      <AppShell.Main>
        <div>
          <p>Authenticated</p>
        </div>
      </AppShell.Main>
    </AppShell>
  );
}