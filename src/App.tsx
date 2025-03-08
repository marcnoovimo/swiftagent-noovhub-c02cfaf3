
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from "@/components/ui/theme-provider";
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import Layout from './components/layout/Layout';
import Index from './pages/Index';
import Documents from './pages/Documents';
import Contacts from './pages/Contacts';
import Messages from './pages/Messages';
import Stats from './pages/Stats';
import MonthlyReport from './pages/MonthlyReport';
import Team from './pages/Team';
import AgentDetail from './pages/AgentDetail';
import Profile from './pages/Profile';
import AgentProfile from './pages/AgentProfile';
import NotFound from './pages/NotFound';
import Calendar from './pages/Calendar';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="light" storageKey="noovimo-theme">
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/monthly-report" element={<MonthlyReport />} />
              <Route path="/team" element={<Team />} />
              <Route path="/team/:id" element={<AgentDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/agent-profile" element={<AgentProfile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
