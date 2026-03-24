import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminSkills from "./pages/admin/AdminSkills";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminCaseStudies from "./pages/admin/AdminCaseStudies";
import AdminExperience from "./pages/admin/AdminExperience";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import SmoothScroll from "./components/SmoothScroll";

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminRoute =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/login");

  return (
    <div className="app-container">
      {/* Do not show standard Navbar on admin or login pages */}
      {!isAdminRoute && <Navbar />}
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-studies/:id" element={<CaseStudyDetail />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="skills" element={<AdminSkills />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="case-studies" element={<AdminCaseStudies />} />
            <Route path="experience" element={<AdminExperience />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
          </Route>

          <Route
            path="*"
            element={
              <div className="text-center mt-5 pt-5 text-white">
                404 - Page Not Found
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <SmoothScroll>
          <AppContent />
        </SmoothScroll>
      </AuthProvider>
    </Router>
  );
};

export default App;
