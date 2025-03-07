
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Messages from "./pages/Messages";
import Documents from "./pages/Documents";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";
import Login from "./components/auth/Login";
import { useState, useEffect } from "react";
import { ThemeProvider } from "./providers/ThemeProvider";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in
  useEffect(() => {
    // In a real app, you would check if the user has a valid session
    const checkAuth = () => {
      const token = localStorage.getItem("auth_token");
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };

    // Simulate auth check
    setTimeout(checkAuth, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-noovimo-50 to-white dark:from-noovimo-950 dark:to-gray-900">
        <div className="animate-pulse-subtle text-noovimo-500 font-bold text-xl">
          Chargement...
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
              
              {/* Protected routes */}
              <Route
                path="/"
                element={
                  isAuthenticated ? (
                    <Layout>
                      <Index />
                    </Layout>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/messages"
                element={
                  isAuthenticated ? (
                    <Layout>
                      <Messages />
                    </Layout>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/documents"
                element={
                  isAuthenticated ? (
                    <Layout>
                      <Documents />
                    </Layout>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/profile"
                element={
                  isAuthenticated ? (
                    <Layout>
                      <Profile />
                    </Layout>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
