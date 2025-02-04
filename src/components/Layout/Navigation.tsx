import { NavLink, Stack, Box, Text, useMantineTheme, rgba } from '@mantine/core';
import { IconCar, IconHeart, IconMessage, IconUsers, IconBell, IconMap } from '@tabler/icons-react';
import { useNavigate, useLocation } from 'react-router-dom';

export function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useMantineTheme();

  const navItems = [
    { icon: <IconMap size={24} />, label: 'Nearby Drivers', path: '/nearby' },
    { icon: <IconCar size={24} />, label: 'Close Encounters', path: '/encounters' },
    { icon: <IconMessage size={24} />, label: 'Messages', path: '/messages' },
    { icon: <IconHeart size={24} />, label: 'Romantic', path: '/romantic' },
    { icon: <IconUsers size={24} />, label: 'Rooms', path: '/rooms' },
    { icon: <IconBell size={24} />, label: 'Notifications', path: '/notifications' }
  ];

  return (
    <Stack gap="xs">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          leftSection={
            <Box style={{ color: location.pathname === item.path ? theme.colors.blue[6] : theme.colors.gray[6] }}>
              {item.icon}
            </Box>
          }
          label={
            <Text size="sm" fw={500}>
              {item.label}
            </Text>
          }
          active={location.pathname === item.path}
          onClick={() => navigate(item.path)}
          styles={(theme) => ({
            root: {
              borderRadius: theme.radius.md,
              padding: theme.spacing.sm,
              '&[data-active]': {
                backgroundColor: rgba(theme.colors.blue[6], 0.1),
              },
              '&:hover': {
                backgroundColor: rgba(theme.colors.blue[6], 0.05),
              }
            }
          })}
        />
      ))}
      </Stack>
    );
  }
