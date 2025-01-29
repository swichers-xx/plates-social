import { NavLink, Stack } from '@mantine/core';
import { IconCar, IconHeart, IconMessage, IconUsers, IconBell, IconMap } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export function Navigation() {
  const navigate = useNavigate();

  const navItems = [
    { icon: <IconMap size={20} />, label: 'Nearby Drivers', path: '/nearby' },
    { icon: <IconCar size={20} />, label: 'Close Encounters', path: '/encounters' },
    { icon: <IconMessage size={20} />, label: 'Messages', path: '/messages' },
    { icon: <IconHeart size={20} />, label: 'Romantic', path: '/romantic' },
    { icon: <IconUsers size={20} />, label: 'Rooms', path: '/rooms' },
    { icon: <IconBell size={20} />, label: 'Notifications', path: '/notifications' }
  ];

  return (
    <Stack gap="xs">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          leftSection={item.icon}
          label={item.label}
          onClick={() => navigate(item.path)}
        />
      ))}
    </Stack>
  );
}
