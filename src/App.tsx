import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/Layout/MainLayout';
import { NearbyDrivers } from './pages/NearbyDrivers';

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Notifications />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/nearby" replace />} />
            <Route path="nearby" element={<NearbyDrivers />} />
            <Route path="encounters" element={<div>Close Encounters View</div>} />
            <Route path="messages" element={<div>Messages View</div>} />
            <Route path="romantic" element={<div>Romantic View</div>} />
            <Route path="rooms" element={<div>Rooms View</div>} />
            <Route path="notifications" element={<div>Notifications View</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

