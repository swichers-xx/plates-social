import { AppShell, Text, Group, useMantineTheme, Box, ActionIcon, rem } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { IconBrandGithub } from '@tabler/icons-react';

export function MainLayout() {
  const theme = useMantineTheme();

  return (
    <AppShell
      padding="md"
      navbar={{ width: 280, breakpoint: 'sm' }}
      header={{ height: 70 }}
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
    >
      <AppShell.Header p="md">
        <Group justify="space-between" h="100%">
          <Group>
            <Box
              w={32}
              h={32}
              style={{
                borderRadius: theme.radius.md,
                background: theme.fn.gradient({ from: 'blue', to: 'cyan' }),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text color="white" fw={700}>PS</Text>
            </Box>
            <Text size="lg" fw={700}>Plates Social</Text>
          </Group>
          <ActionIcon 
            variant="light" 
            size="lg"
            component="a"
            href="https://github.com/yourusername/plates-social"
            target="_blank"
          >
            <IconBrandGithub style={{ width: rem(20), height: rem(20) }} />
          </ActionIcon>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Navigation />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
