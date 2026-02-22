import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import StudioPage from './pages/StudioPage';
import ClassesPage from './pages/ClassesPage';
import SignUpPage from './pages/SignUpPage';
import CalendarPage from './pages/CalendarPage';

// Admin imports
import PasswordGate from './components/admin/PasswordGate';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminClasses from './pages/admin/AdminClasses';
import AdminSchedule from './pages/admin/AdminSchedule';
import AdminCategories from './pages/admin/AdminCategories';
import AdminMemberships from './pages/admin/AdminMemberships';

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="studio" element={<StudioPage />} />
            <Route path="classes" element={<ClassesPage />} />
            <Route path="sign-up" element={<SignUpPage />} />
            <Route path="calendar" element={<CalendarPage />} />
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
            <Route path="memberships" element={<AdminMemberships />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
