import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import ClassesPage from './pages/ClassesPage';

// Admin imports
import PasswordGate from './components/admin/PasswordGate';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminClasses from './pages/admin/AdminClasses';
import AdminSchedule from './pages/admin/AdminSchedule';
import AdminCategories from './pages/admin/AdminCategories';
import AdminRegistrations from './pages/admin/AdminRegistrations';

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="classes" element={<ClassesPage />} />
          </Route>

          {/* Admin routes */}
          <Route
            path="/admin/*"
            element={
              <PasswordGate>
                <AdminLayout />
              </PasswordGate>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="classes" element={<AdminClasses />} />
            <Route path="schedule" element={<AdminSchedule />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="registrations" element={<AdminRegistrations />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
