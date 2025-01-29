import { AppShell, Text } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';

export function MainLayout() {
  return (
    <AppShell
      padding="md"
      navbar={{ width: 250, breakpoint: 'sm' }}
      header={{ height: 60 }}
    >
      <AppShell.Header p="xs">
        <Text size="xl" fw={700}>Plates Social</Text>
      </AppShell.Header>

      <AppShell.Navbar p="xs">
        <Navigation />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
